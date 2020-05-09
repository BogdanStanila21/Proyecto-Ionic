import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioModel } from '../models/usuario';
import { ActivatedRoute } from '@angular/router';
import { HomeserviceService } from '../shared/homeservice.service';
import { LoginService } from '../service/login.service';
import { Articulo } from '../models/articulo';
import { ArticuloService } from '../service/articulo.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  {
  public usuario:UsuarioModel
  public misArticulos: Articulo[]
  public editarArticulo=new Articulo
  public idArticulo = null;
  public articulo: any;
  @Input() articuloId:number

  constructor(private modalCtrl:ModalController,private activatedRoute: ActivatedRoute, private homeservice: HomeserviceService, private auth:LoginService, private Api: ArticuloService) { }

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  };

  /*VerArticulos(){
    return this.Api.getArticulo(1).subscribe((data:Articulo[])=>{
      this.misArticulos=data
      console.log(this.misArticulos)
    })
  };*/

  async mostrarInfo(){
    console.log(this.articuloId)
    await this.homeservice.getArticulo(this.articuloId).subscribe((data: any) => {
      console.log(data);
      this.articulo = data;
    })
  };

  modificarArticulo(nombre:string,antiguedad:string,descripcion:string,estado:string){
    let editar=new Articulo;
    editar.nombre=nombre;
    editar.antiguedad=antiguedad;
    editar.descripcion=descripcion;
    editar.estado=estado;
    //editar.categoria=categoria;
    //editar.imagen=imagen
    editar.articulo_id=this.editarArticulo.articulo_id
    return this.Api.putArticulo(editar).subscribe((data)=>{
      console.log(data);
      this.mostrarInfo()
    })
  };
  articuloModificado(articuloId){
    return this.Api.getModificado(articuloId).subscribe((data)=>{
      this.editarArticulo=data[0]
      console.log(this.editarArticulo)
    })
  };

  dismissModal(){
    this.modalCtrl.dismiss()
  };
    
  ngOnInit() {
    this.mostrarInfo()
  };

}

