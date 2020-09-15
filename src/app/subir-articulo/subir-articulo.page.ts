import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../service/articulo.service';
import { Articulo } from '../models/articulo';
import { LoginService } from '../service/login.service';
import { UsuarioModel } from '../models/usuario';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-subir-articulo',
  templateUrl: './subir-articulo.page.html',
  styleUrls: ['./subir-articulo.page.scss'],
})
export class SubirArticuloPage implements OnInit {

  public valor: string = " ";
  public usuario:UsuarioModel;

  constructor(private Api: ArticuloService,  private auth: LoginService, private toastController:ToastController) { }

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  }

  insertarArticulo(nombre:string,antiguedad:string,descripcion:string,estado:string,categoria:string,imagen:string){
    let articulo= new Articulo;
    articulo.nombre=nombre;
    articulo.antiguedad=antiguedad;
    articulo.descripcion=descripcion;
    articulo.estado=estado;
    articulo.categoria=categoria;
    articulo.imagen=imagen;
    articulo.usuario_id=this.usuario.usuario_id
    return this.Api.postArticulo(articulo).subscribe((data)=>{
      console.log(data);
      this.presentToastConfirmacion();
    })
  };

  async presentToastConfirmacion() {
    const toast = await this.toastController.create({
      message: 'Libro cargado',
      duration: 2000,
      color:"success",
      position:"middle"
    });
    toast.present();
  }

  ngOnInit() {
  this.usuarioLogeado();
  }

}
