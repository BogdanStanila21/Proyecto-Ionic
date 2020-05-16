import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articulo } from '../models/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private url1="http://localhost:3000/usuario";
  private url2="http://localhost:3000/articulo";
  private url3="http://localhost:3000/misarticulos";
  private url4="http://localhost:3000/articulo-usuario";

  constructor(private http:HttpClient) { }

  getUsuario(usuarioId: number) {
    return this.http.get(this.url1 + "/" + usuarioId)
  }

  //subir un artículo//
  postArticulo(nuevoArticulo:Articulo){
    return this.http.post(this.url2,nuevoArticulo)
  }

  //mostrar mis articulos//
  getArticulo(usuario_id:Number){
    return this.http.get(this.url3 + "/" + usuario_id);
  }
  //editar un articulo//
  putArticulo(articuloEditado:Articulo){
    return this.http.put(this.url2, articuloEditado);
  }

  getArticuloUsuario(articuloID){
    return this.http.get(this.url4+"/"+articuloID)
  }


}
