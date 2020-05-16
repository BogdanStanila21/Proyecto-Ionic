import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Articulo } from '../models/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private url1="http://localhost:3000/usuario";
  private url2="http://localhost:3000/articulo";
  private url3="http://localhost:3000/misarticulos";
  private url4="http://localhost:3000/articuloinfo";
  private url5="http://localhost:3000/articulo-usuario";

  constructor(private http:HttpClient) { }

  getUsuario(usuarioId: number) {
    return this.http.get(this.url1 + "/" + usuarioId)
  };

  //subir un artículo//
  postArticulo(nuevoArticulo:Articulo){
    return this.http.post(this.url2,nuevoArticulo)
  };

  //mostrar mis articulos//
  getArticulos(usuario_id:Number){
    return this.http.get(this.url3 + "/" + usuario_id);
  };

  //editar un articulo//
  getArticulo(articulo_id:number){
    return this.http.get(this.url4+ "/" + articulo_id)
  };

  putArticulo(articuloEditado:Articulo){
    return this.http.put(this.url2, articuloEditado);
  };

  //para el modal de editar artículo
  getModificado(articulo_id:number){
    return this.http.get(this.url2+"/"+articulo_id)
  };

  //borrar un artículo
  deleteArticulo(articuloId:number){
    const options={headers:new HttpHeaders({
      'Content-Type':'application/json'
    }),
    body:{articulo_id:articuloId},
    }
  return this.http.delete(this.url2, options)
  };


  getArticuloUsuario(articuloID){
    return this.http.get(this.url5+"/"+articuloID)
  }


}
