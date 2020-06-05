import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'
import { UsuarioModel } from './../models/usuario';
import { LoginService } from './../service/login.service';
import { UsuarioService } from './../service/usuario.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { passValidation } from "./custom-validator";

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  public datosDeUsuario: UsuarioModel[];
  public usuario: UsuarioModel;
  editarForm: FormGroup;
  public url: string = ""
  public nick: string;
  public nombre: string;
  public email: string;
  public lugar: string;
  public contrasenya: string;

  constructor(public alertController: AlertController, private router: Router, public toastController: ToastController, private auth: LoginService, private usuarioService: UsuarioService, private fb: FormBuilder) {
    this.buildForm();
  }

  usuarioLogeado() {
    this.usuario = this.auth.usuarioId;
    console.log(this.usuario)
  }

  buildForm() {
    this.editarForm = this.fb.group(
      {
        nick: new FormControl(null, [
          Validators.minLength(4),
          Validators.maxLength(12),
          Validators.required
        ]),
        nombre: new FormControl(null, [
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.required
        ]),
        email: new FormControl(null, [
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
          Validators.required
        ]),
        lugar: new FormControl("", [
          Validators.required
        ]),
        contrasenya: new FormControl("", [
          Validators.required,
          Validators.pattern("(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}")
        ]),
        contrasenya2: new FormControl("", [
          Validators.required,
          Validators.pattern("(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}")
        ])
      }, {
      validators: passValidation.matchPass
    }
    )
  }

  datosUsuario() {
    this.usuarioService.getUsuario(this.usuario.usuario_id).subscribe((data: UsuarioModel[]) => {
      this.datosDeUsuario = data;
      this.url = data[0].foto;
    })
  }

  editarPerfil(nick: string, nombre: string, email: string, lugar: string, contrasenya: string, contrasenyaActual: string) {
    let usuario = new UsuarioModel;
    usuario.nick = nick;
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.lugar = lugar;
    usuario.foto = this.url;
    usuario.contrasenya = contrasenya;
    usuario.usuario_id = this.usuario.usuario_id;
    usuario.valoraciones=this.usuario.valoraciones;
    let existeEmail = false;
    if (this.datosDeUsuario[0].contrasenya != contrasenyaActual) {
      this.presentToastContrasenya()
    } else {
      this.usuarioService.getUsuarios().subscribe((data: UsuarioModel[]) => {
        for (let i = 0; i < data.length; i++) {
          if ((data[i].email == usuario.email) && (data[i].email != this.usuario.email)) {
            existeEmail = true;
          }
        }
        if (existeEmail) {
          this.presentToastEmail()
        } else {
          return this.usuarioService.putUsuario(usuario).subscribe((data) => {
            this.presentToastConfirmation().then(() => {
              this.auth.setUser(usuario);
              this.router.navigate(['/perfil'])
              window.location.reload()
            });
          })
        }
      })

    }

  }

  async presentAlertFoto() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Imagen!',
      message: 'Introduce la URL de tu foto de perfil',
      animated: true,
      inputs: [
        {
          name: 'url',
          type: "textarea",
          placeholder: 'URL'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alertButton',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          cssClass: 'alertButton2',
          handler: (data) => {
            this.url = data.url;
            console.log(this.url)
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirm(nick: string, nombre: string, email: string, lugar: string, contrasenya: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Confirmación!',
      message: 'Introduce tu contraseña actual para actualizar tus datos',
      animated: true,
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alertButton',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          cssClass: 'alertButton2',
          handler: (data) => {
            this.editarPerfil(nick, nombre, email, lugar, contrasenya, data.password)
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToastConfirmation() {
    const toast = await this.toastController.create({
      message: 'Perfil editado satisfactoriamente',
      color: 'success',
      position: 'middle',
      duration: 2500
    });
    toast.present();
  }

  async presentToastContrasenya() {
    const toast = await this.toastController.create({
      message: '¡La contraseña no coincide!',
      color: 'warning',
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }

  async presentToastEmail() {
    const toast = await this.toastController.create({
      message: '¡Email registrado! Prueba con otro email.',
      color: 'warning',
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.usuarioLogeado();
    this.datosUsuario();
  }

}
