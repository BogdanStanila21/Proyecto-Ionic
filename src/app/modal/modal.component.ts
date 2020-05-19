import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioModel } from '../models/usuario';
import { LoginService } from '../service/login.service';
import { Articulo } from '../models/articulo';
import { ArticuloService } from '../service/articulo.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  {
  public usuario:UsuarioModel
  public misArticulos: Articulo[]
  public idArticulo = null;
  public articulo: any;
  @Input() articuloId:number
 

  constructor(private modalCtrl:ModalController, private auth:LoginService, private Api: ArticuloService, public toastController: ToastController) { }

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  };
  async mostrarInfo(){
    console.log(this.articuloId)
    await this.Api.getArticulo(this.articuloId).subscribe((data: any) => {
      console.log(data);
      this.articulo = data;
    })
  };

  modificarArticulo(nombre:string,antiguedad:string,descripcion:string,estado:string,categoria:string,imagen:string, articulo_id:number){
    let editar=new Articulo;
    editar.nombre=nombre;
    editar.antiguedad=antiguedad;
    editar.descripcion=descripcion;
    editar.estado=estado;
    editar.categoria=categoria;
    editar.imagen=imagen
    editar.articulo_id=articulo_id
    return this.Api.putArticulo(editar).subscribe((data)=>{
      console.log(data);
      this.presentToast()
      this.dismissModal()
    })
  };

  borrarArticulo(articuloId){
    return this.Api.deleteArticulo(articuloId).subscribe((data)=>{
      console.log(data);
      this.dismissModal()
    })
  };

  dismissModal(){
    this.modalCtrl.dismiss()
    //window.location.reload()
  };
    
  ngOnInit() {
    this.mostrarInfo()
  };

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Has actualizado correctamente',
      duration: 2000,
      position: 'middle',
      color: 'success'
    });
    toast.present();
  };

}

