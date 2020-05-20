import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from './../models/usuario';
import { LoginService } from './../service/login.service';
import { ArticuloService } from './../service/articulo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
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
  public intercambio:IntercambioModel[];

  constructor(private auth:LoginService, private articuloService:ArticuloService, private activatedRoute:ActivatedRoute, private alertController:AlertController, private intercambioService:IntercambioService, private router:Router, private toastController:ToastController) { }

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  }

  getMisArticulos(){
    return this.articuloService.getArticulos(this.usuario.usuario_id).subscribe((data)=>{
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
    let existe=false;
    this.intercambioService.getIntercambios().subscribe((data:IntercambioModel[])=>{
      console.log(data)
      for(let i=0;i<data.length;i++){
        if(((data[i].articulo_idRealiza==articuloId) && (data[i].articulo_idRecibe==this.articulo_idRecibe)) || ((data[i].articulo_idRealiza==this.articulo_idRecibe) && (data[i].articulo_idRecibe==articuloId))){
          existe=true
          console.log(existe)
        }
      }
      if(existe){
        this.presentToastExistePeticion();
      }else{
        return this.intercambioService.postIntercambio(intercambio).subscribe((data)=>{
          console.log(data)
          this.presentToastConfirmacion();
          this.router.navigate(['/intercambio'])
        })
      }
    })      
  }

  async presentAlertConfirm(articulo_id:number) {
    const alert = await this.alertController.create({
      cssClass:'alert',
      header: '¡Petición!',
      message: '¿Estas seguro de realizar esta petición?',
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
            this.postPeticion(articulo_id)
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToastConfirmacion() {
    const toast = await this.toastController.create({
      message: '¡Petición creada!',
      color: "success",
      position: "top",
      duration: 2000
    });
    toast.present();
  }
  async presentToastExistePeticion() {
    const toast = await this.toastController.create({
      message: '¡Petición en curso!',
      color: "danger",
      position: "middle",
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.articulo_idRecibe=this.activatedRoute.snapshot.paramMap.get('articulo_id')
    this.usuarioLogeado();
    this.getMisArticulos();
    this.getUsuarioArticulo();
  }

}
