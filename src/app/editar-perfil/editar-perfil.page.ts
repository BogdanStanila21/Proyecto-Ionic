import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'
import { UsuarioModel } from './../models/usuario';
import { LoginService } from './../service/login.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {


  public usuario:UsuarioModel;
  constructor(public alertController:AlertController, private router:Router, public toastController: ToastController, private auth:LoginService) { }

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  }

  ngOnInit() {
    this.usuarioLogeado();
  }

  async presentAlertConfirm() {
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
  }

  async presentToastConfirmation() {
    const toast = await this.toastController.create({
      message: 'Perfil editado satisfactoriamente',
      color:'success',
      position:'middle',
      duration: 2000
    });
    toast.present();
  }




}
