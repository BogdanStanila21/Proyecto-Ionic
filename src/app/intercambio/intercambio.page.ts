import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from './../models/usuario';
import { LoginService } from './../service/login.service';
import { IntercambioService } from './../service/intercambio.service';
import { IntercambioModel, IntercambioVerModel } from './../models/intercambio';
import { Articulo } from './../models/articulo';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intercambio',
  templateUrl: './intercambio.page.html',
  styleUrls: ['./intercambio.page.scss'],
})
export class IntercambioPage implements OnInit {

  public usuario: UsuarioModel;
  public peticionesRealiza_recibe:any;
  public checkbox=false;
  public posicionSegment=false;

  constructor(private auth: LoginService, private intercambioService: IntercambioService, private alertController:AlertController, private router:Router) { }

  usuarioLogeado() {
    this.usuario = this.auth.usuarioId;
  }

  getIntercambioQueRealizo() {
    this.intercambioService.getIntercambioRealiza(this.usuario.usuario_id).subscribe((data: IntercambioModel[]) => {
      let datos = [];

      for (let i = 0; i < data.length; i++) {

        let datosUnUsuario = new IntercambioVerModel;
        let articuloRealiza: Articulo[];
        let articuloRecibe: Articulo[];
        let usuarioRecibe: UsuarioModel[];

        this.intercambioService.getIntercambioArticulo(data[i].articulo_idRealiza).subscribe((data1: Articulo[]) => {
          articuloRealiza = data1;

          this.intercambioService.getIntercambioArticulo(data[i].articulo_idRecibe).subscribe((data2: Articulo[]) => {
            articuloRecibe = data2;

            this.intercambioService.getIntercambioUsuario(data[i].usuario_idRecibe).subscribe((data3: UsuarioModel[]) => {
              usuarioRecibe = data3;

              datosUnUsuario.articulo_idRealiza = articuloRealiza;
              datosUnUsuario.articulo_idRecibe = articuloRecibe;
              datosUnUsuario.usuario_idRecibe = usuarioRecibe;
              datosUnUsuario.intercambio_id=[data[i]];
              
              datos.push(datosUnUsuario)
            })
          })
        })
      }
      console.log(datos)
      this.peticionesRealiza_recibe=datos;
    })
  }

  getIntercambioQueRecibo() {
    this.intercambioService.getIntercambioRecibe(this.usuario.usuario_id).subscribe((data: IntercambioModel[]) => {
      let datos = [];

      for (let i = 0; i < data.length; i++) {

        let datosUnUsuario = new IntercambioVerModel;
        let articuloRealiza: Articulo[];
        let articuloRecibe: Articulo[];
        let usuarioRealiza: UsuarioModel[];

        this.intercambioService.getIntercambioArticulo(data[i].articulo_idRealiza).subscribe((data1: Articulo[]) => {
          articuloRealiza = data1;

          this.intercambioService.getIntercambioArticulo(data[i].articulo_idRecibe).subscribe((data2: Articulo[]) => {
            articuloRecibe = data2;

            this.intercambioService.getIntercambioUsuario(data[i].usuario_idRealiza).subscribe((data3: UsuarioModel[]) => {
              usuarioRealiza = data3;

              datosUnUsuario.articulo_idRealiza = articuloRealiza;
              datosUnUsuario.articulo_idRecibe = articuloRecibe;
              datosUnUsuario.usuario_idRealiza = usuarioRealiza;
              datosUnUsuario.intercambio_id=[data[i]];
              
              datos.push(datosUnUsuario)
            })
          })
        })
      }
      console.log(datos)
      this.peticionesRealiza_recibe=datos;
    })
  }

  actualizarIntercambio(id:number, estado:string){
    let estado_intercambio = new IntercambioModel;
    estado_intercambio.intercambio_id=id;
    estado_intercambio.estado_intercambio=estado;
    return this.intercambioService.putIntercambio(estado_intercambio).subscribe((data)=>{
      console.log(data)
      if(this.posicionSegment){
        this.getIntercambioQueRecibo();
      }
    })
    
  }

  eliminarIntercambio(id:number){
    return this.intercambioService.deleteIntercambio(id).subscribe((data)=>{
      console.log(data)
    })
  }

  verUsuario(usuarioId:number){
    this.router.navigate(['/otro',usuarioId])
  }

  doRefresh(event) {
    this.getIntercambioQueRecibo();
    this.getIntercambioQueRealizo();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1500);
  }

  segmentChanged(ev: any) {
    if(ev.detail.value=="recibe"){
      this.posicionSegment=true;
    }
  }

  async presentAlertConfirm(id:number, estado:string) {
    const alert = await this.alertController.create({
      header: 'Confirmar!',
      cssClass:'alert',
      message: '¿Estas seguro de aceptar esta petición?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alertButton',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          cssClass: 'alertButton2',
          handler: () => {
            this.actualizarIntercambio(id, estado)
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertRechazar(id:number, estado:string) {
    const alert = await this.alertController.create({
      header: '!Rechazar!',
      cssClass:'alert',
      message: '¿Estas seguro de rechazar esta petición?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alertButton',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          cssClass: 'alertButton2',
          handler: () => {
            this.actualizarIntercambio(id, estado)
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertCancelar(id:number) {
    const alert = await this.alertController.create({
      header: '!Cancelar!',
      cssClass:'alert',
      message: '¿Estas seguro de cancelar esta petición?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alertButton',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          cssClass: 'alertButton2',
          handler: () => {
            this.eliminarIntercambio(id)
            this.getIntercambioQueRealizo();
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.usuarioLogeado();
    this.getIntercambioQueRealizo();
  }

}
