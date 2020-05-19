import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from './../models/usuario';
import { LoginService } from './../service/login.service';
import { ArticuloService } from './../service/articulo.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IntercambioModel } from './../models/intercambio';
import { IntercambioService } from './../service/intercambio.service';

@Component({
  selector: 'app-selecionar-mi-producto',
  templateUrl: './selecionar-mi-producto.page.html',
  styleUrls: ['./selecionar-mi-producto.page.scss'],
})
export class SelecionarMiProductoPage implements OnInit {

  public usuario:UsuarioModel;
  public misArticulos:any;
  public articulo_idRecibe=null;
  public usuario_idRecibe:number;

  constructor(private auth:LoginService, private articuloService:ArticuloService, private activatedRoute:ActivatedRoute, private alertController:AlertController, private intercambioService:IntercambioService) { }

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  }

  getMisArticulos(){
    return this.articuloService.getArticulo(this.usuario.usuario_id).subscribe((data)=>{
      this.misArticulos=data;
      console.log(data)
    })
  }

  getUsuarioArticulo(){
    return this.articuloService.getArticuloUsuario(this.articulo_idRecibe).subscribe((data)=>{
      this.usuario_idRecibe=data[0].usuario_id;
      console.log(this.usuario_idRecibe)
    })
  }

  postPeticion(articuloId:number){
    let intercambio=new IntercambioModel;
    intercambio.usuario_idRealiza=this.usuario.usuario_id;
    intercambio.articulo_idRealiza=articuloId;
    intercambio.usuario_idRecibe=this.usuario_idRecibe;
    intercambio.articulo_idRecibe=this.articulo_idRecibe;

    return this.intercambioService.postIntercambio(intercambio).subscribe((data)=>{
      console.log(data)
    })
  }

  async presentAlertConfirm(articulo_id:number) {
    const alert = await this.alertController.create({
      cssClass:'alert',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertButton',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          cssClass: 'alertButton2',
          handler: () => {
            this.postPeticion(articulo_id)
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.articulo_idRecibe=this.activatedRoute.snapshot.paramMap.get('articulo_id')
    this.usuarioLogeado();
    this.getMisArticulos();
    this.getUsuarioArticulo();
  }

}
