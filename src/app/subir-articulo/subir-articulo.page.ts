import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../service/articulo.service';
import { Articulo } from '../models/articulo';
import { ToastController } from '@ionic/angular';
import { LoginService } from '../service/login.service';
import { UsuarioModel } from '../models/usuario';

@Component({
  selector: 'app-subir-articulo',
  templateUrl: './subir-articulo.page.html',
  styleUrls: ['./subir-articulo.page.scss'],
})
export class SubirArticuloPage implements OnInit {
  public usuario:UsuarioModel
  public valor: string = " "
  constructor(private Api: ArticuloService, public toastController: ToastController, private auth:LoginService,) { }

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  };

  insertarArticulo(nombre:string,antiguedad:string,descripcion:string,estado:string,categoria:string,imagen:string){
    let articulo= new Articulo;
    articulo.nombre=nombre;
    articulo.antiguedad=antiguedad;
    articulo.descripcion=descripcion;
    articulo.estado=estado;
    articulo.categoria=categoria;
    articulo.imagen=imagen;
    articulo.usuario_id=1
    return this.Api.postArticulo(articulo).subscribe((data)=>{
      console.log(data);
      this.presentToast()
    })
  };

  ngOnInit() {
  };

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Has añadido un nuevo artículo',
      duration: 1000,
      position: 'top',
      color: 'warning'
    });
    toast.present();
  };

}


