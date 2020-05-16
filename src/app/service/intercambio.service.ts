import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IntercambioModel } from './../models/intercambio';

@Injectable({
  providedIn: 'root'
})
export class IntercambioService {

  private url = "http://localhost:3000/intercambio";
  private url2 = "http://localhost:3000/intercambio/realiza";
  private url3 = "http://localhost:3000/intercambio/recibe";
  private url4 = "http://localhost:3000/intercambio/articulo";
  private url5 = "http://localhost:3000/intercambio/usuario";

  constructor(private http:HttpClient) { }

  getIntercambioRealiza(usuarioId){
    return this.http.get(this.url2+"/"+usuarioId)
  }

  getIntercambioRecibe(usuarioId){
    return this.http.get(this.url3+"/"+usuarioId)
  }

  getIntercambioArticulo(articuloId:number){
    return this.http.get(this.url4+"/"+articuloId)
  }

  getIntercambioUsuario(usuarioId:number){
    return this.http.get(this.url5+"/"+usuarioId)
  }

  postIntercambio(intercambio:IntercambioModel){
    return this.http.post(this.url,intercambio)
  }

  putIntercambio(estado:IntercambioModel){
    return this.http.put(this.url, estado)
  }

  deleteIntercambio(intercambioId:number){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { intercambio_id: intercambioId },
    }
    return this.http.delete(this.url,options)
  }

}
