import { Component, OnInit } from "@angular/core";
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
  public misArticulos: Articulo[]
  public editarArticulo=new Articulo
  constructor(private menu: MenuController, private Api: ArticuloService, private modalCtrl:ModalController) { }

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
    return this.Api.getArticulo(1).subscribe((data:Articulo[])=>{
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


  ngOnInit() {
    this.VerArticulos()
  }
}
