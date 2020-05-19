import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from './../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url="http://localhost:3000/usuario";
  constructor(private http:HttpClient) { }

  getUsuarios(){
    return this.http.get(this.url);
  };

  postUsuario(usuario:UsuarioModel){
    return this.http.post(this.url,usuario);
  };

  putUsuario(usuarioEditado:UsuarioModel){
    return this.http.put(this.url,usuarioEditado);
  };


}
