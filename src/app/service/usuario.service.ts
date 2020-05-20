import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from './../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url="http://localhost:3000/usuario";
  private url2="http://localhost:3000/usuario/valoraciones";

  constructor(private http:HttpClient) { }

  getUsuario(idUsuario:number){
    return this.http.get(this.url +"/"+idUsuario)
  }

  getUsuarios(){
    return this.http.get(this.url)
  }

  postUsuario(usuario:UsuarioModel){
    return this.http.post(this.url,usuario);
  }

  putUsuarioValoracion(valoracion:UsuarioModel){
    return this.http.put(this.url2, valoracion)
  }

}
