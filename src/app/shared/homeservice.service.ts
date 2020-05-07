import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeserviceService {
  private url = "http://localhost:3000/articulos";
  private url2 = "http://localhost:3000/articulo";
  constructor(private http: HttpClient) { }

  getTodos(usuario: Number){
    return this.http.get(this.url + "/" + usuario);
    }

  getArticulo(articulo: Number){
    return this.http.get(this.url2 + "/" + articulo)
  }
  
}