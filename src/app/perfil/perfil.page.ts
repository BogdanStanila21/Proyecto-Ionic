import { Component, OnInit } from "@angular/core";
import { LoginService } from './../service/login.service';
import { Router } from '@angular/router';
import { UsuarioModel } from './../models/usuario';
import { async } from 'rxjs/internal/scheduler/async';

import { MenuController, ModalController } from "@ionic/angular";
import { ArticuloService } from '../service/articulo.service';
import { Articulo } from '../models/articulo';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
})
export class PerfilPage {

  public usuario:UsuarioModel
  public misArticulos: Articulo[]
  public editarArticulo=new Articulo
  constructor(private menu: MenuController, private auth:LoginService, private router:Router,  private Api: ArticuloService, private modalCtrl:ModalController) {}

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  }
  
  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  };

  openEnd() {
    this.menu.open("end");
  };

  openCustom() {
    this.menu.enable(true, "custom");
    this.menu.open("custom");
  };

  VerArticulos(){
    return this.Api.getArticulo(this.usuario.usuario_id).subscribe((data:Articulo[])=>{
      this.misArticulos=data
      console.log(this.misArticulos)
    })
  };

  modificarArticulo(nombre:string,antiguedad:string,descripcion:string,estado:string,categoria:string,imagen:string){
    let editar=new Articulo;
    editar.nombre=nombre;
    editar.antiguedad=antiguedad;
    editar.descripcion=descripcion;
    editar.estado=estado;
    editar.categoria=categoria;
    editar.imagen=imagen
    return this.Api.putArticulo(editar).subscribe((data)=>{
      console.log(data);
      this.VerArticulos()
    })
  };

  async abirModal(){
    const modal = await this.modalCtrl.create({
      component: ModalComponent
    });
    await modal.present()
  }


  cerrarSesion(){
    this.auth.logOut() 
    window.location.reload();
  }

  ngOnInit() {
    this.usuarioLogeado();
    this.VerArticulos()
  }
}
