import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'
import { UsuarioModel } from './../models/usuario';
import { LoginService } from './../service/login.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  public usuario:UsuarioModel;
  public nuevo:UsuarioModel[]

  constructor(public alertController:AlertController, private router:Router, public toastController: ToastController, private auth:LoginService, private Api: UsuarioService) { }

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  };

  mostrarUsuario(){
    return this.Api.getUsuarios().subscribe((data)=>{
      console.log(data)
    })
  };

  editarPerfil(nombre:string,nick:string,email:string,lugar:string,contrasenya:string,foto:string, usuario_id:number ){
    let editar=new UsuarioModel;
    editar.nombre=nombre;
    editar.nick=nick;
    editar.email=email;
    editar.lugar=lugar;
    editar.contrasenya=contrasenya;
    editar.foto=foto;
    editar.usuario_id=usuario_id;
    console.log(editar)
    return this.Api.putUsuario(editar).subscribe((data)=>{
      console.log(data);
      this.usuarioLogeado()
      //this.presentToastConfirmation();
    });
  };


  ngOnInit() {
    this.usuarioLogeado();
  };

  /*async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass:'alert',
      header: 'Confirmación!',
      message: 'Introduce tu contraseña actual para actualizar tus datos',
      animated:true,
      inputs:[
        {
          name:'password',
          type:'password',
          placeholder:'Contraseña'
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
          handler: () => {
            this.router.navigateByUrl("/perfil");
            this.presentToastConfirmation();
             
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  };

  async presentToastConfirmation() {
    const toast = await this.toastController.create({
      message: 'Perfil editado satisfactoriamente',
      color:'warning',
      position:'top',
      duration: 2000
    });
    toast.present();
  };*/


}
