import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../service/articulo.service';
import { Articulo } from '../models/articulo';

@Component({
  selector: 'app-subir-articulo',
  templateUrl: './subir-articulo.page.html',
  styleUrls: ['./subir-articulo.page.scss'],
})
export class SubirArticuloPage implements OnInit {
  public valor: string = " "
  constructor(private Api: ArticuloService) { }

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
    })
  }

  ngOnInit() {
  }

}
