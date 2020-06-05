import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from './../models/usuario';
import { LoginService } from './../service/login.service';
import { IntercambioService } from './../service/intercambio.service';
import { IntercambioModel, IntercambioVerModel } from './../models/intercambio';
import { Articulo } from './../models/articulo';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from './../service/usuario.service';
import { ArticuloService } from './../service/articulo.service';


@Component({
  selector: 'app-intercambio',
  templateUrl: './intercambio.page.html',
  styleUrls: ['./intercambio.page.scss'],
})
export class IntercambioPage implements OnInit {

  public usuario: UsuarioModel;
  public peticionesRealiza_recibe:IntercambioVerModel[]=[];
  public checkbox=false;
  public posicionSegment=false;
  public valorRating:number;
  public realiza=false;
  public recibe=false;

  constructor(private auth: LoginService, private intercambioService: IntercambioService, private alertController:AlertController, private router:Router, private usuarioService:UsuarioService, private articuloService: ArticuloService, private loadingController:LoadingController) { }

  usuarioLogeado() {
    this.usuario = this.auth.usuarioId;
  }

  getIntercambioQueRealizo() {
    this.intercambioService.getIntercambioRealiza(this.usuario.usuario_id).subscribe((data: IntercambioModel[]) => {
      let datos = [];
      if(data[0] == null){
        this.realiza=true;
        console.log(this.realiza)
      }else{
        this.realiza=false;
      }

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
              
              if((datosUnUsuario.intercambio_id[0].usuarioIdValoracion1 != 0) && (datosUnUsuario.intercambio_id[0].usuarioIdValoracion1 == datosUnUsuario.usuario_idRecibe[0].usuario_id)){
                console.log("valorado")
              }else{
                datos.push(datosUnUsuario)
              }
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
      if(data[0] == null){
        this.recibe=true;
        console.log(this.recibe)
      }else{
        this.recibe=false;
      }

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
              datosUnUsuario.usuario_idRecibe = usuarioRealiza;
              datosUnUsuario.intercambio_id=[data[i]];
              
              
              if((datosUnUsuario.intercambio_id[0].usuarioIdValoracion1 != 0) && (datosUnUsuario.intercambio_id[0].usuarioIdValoracion1 == datosUnUsuario.usuario_idRecibe[0].usuario_id)){
                console.log("valorado")
              }else{
                datos.push(datosUnUsuario);                
              }
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
      }else{
        this.getIntercambioQueRealizo();
      }
    })
    
  }

  eliminarIntercambio(id:number){
    return this.intercambioService.deleteIntercambio(id).subscribe((data)=>{
      console.log(data)
      this.getIntercambioQueRealizo();
    })
  }

  verUsuario(usuarioId:number){
    this.router.navigate(['/otro',usuarioId])
  }

  valorValorar(num:number, usuarioId:number, intercambioId:number, usuarioIDValoracion:number, articulo_id1:number, articulo_id2:number){
    console.log(num, usuarioId)
    this.presentAlertValoraciones(num,usuarioId,intercambioId, usuarioIDValoracion, articulo_id1, articulo_id2);
    
  }
  
  valorarUsuario(valoracion:number, usuarioId:number){
    let usuarioValoracion = new UsuarioModel;
    usuarioValoracion.usuario_id=usuarioId;
    usuarioValoracion.valoraciones=valoracion;
    return this.usuarioService.putUsuarioValoracion(usuarioValoracion).subscribe((data)=>{
      console.log(data);
    })
  }

  putIntercambioValoracionUsuario(intercambioId:number, usuarioId:number){
    let valoracion=new IntercambioModel;
    valoracion.intercambio_id=intercambioId;
    valoracion.usuarioIdValoracion1=usuarioId
    return this.intercambioService.putIntercambioValoracion(valoracion).subscribe((data)=>{
      console.log(data)
    })
  }

  elimiarArticulo(articulo_id:number){
    return this.articuloService.deleteArticulo(articulo_id).subscribe((data)=>{
      console.log(data)
      if(this.posicionSegment){
        this.getIntercambioQueRecibo();
      }else{
        this.getIntercambioQueRealizo();
      }
    })
  }


  doRefresh(event) {
    if (this.posicionSegment==false){
      this.getIntercambioQueRealizo();
    }else if(this.posicionSegment==true){
      this.getIntercambioQueRecibo();
    }
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1500);
  }

  segmentChanged(ev: any) {
    if(ev.detail.value=="recibe"){
      this.posicionSegment=true;
      //console.log(this.posicionSegment)
    }else if(ev.detail.value=="realiza"){
      this.posicionSegment=false;
      //console.log(this.posicionSegment)
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
            this.actualizarIntercambio(id, estado);
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
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertValoraciones(valoracion:number, usuarioId:number, intercambioId:number, usuarioIdValoracion:number, articulo_id1:number, articulo_id2:number) {
    const alert = await this.alertController.create({
      header: '!Valoración!',
      cssClass:'alert',
      message: '¿Deseas valorar este intercambio con '+valoracion+' estrellas?',
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
            this.valorarUsuario(valoracion, usuarioId);
            this.putIntercambioValoracionUsuario(intercambioId, usuarioId)
            this.checkbox=false
            if(usuarioIdValoracion!=0){
              this.eliminarIntercambio(intercambioId);
              this.elimiarArticulo(articulo_id1);
              this.elimiarArticulo(articulo_id2);
            }
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
