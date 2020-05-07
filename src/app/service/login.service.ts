import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './../models/login';
import { isNullOrUndefined } from 'util'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url="http://localhost:3000/usuario/login"
  public usuarioId:any;
  public check:boolean=false;
  constructor(private http:HttpClient) {
    this.getUser();
   }

  authLogin(login:LoginModel){
    return this.http.post(this.url,login);
  }

  setUser(usuario){
    let usuario_local=JSON.stringify(usuario);
    sessionStorage.setItem("currentUser",usuario_local)
  }

  getUser(){
    let usuario_local=sessionStorage.getItem("currentUser")
    if (!isNullOrUndefined(usuario_local)){
      let usuario = JSON.parse(usuario_local);
      this.usuarioId=usuario
      this.check=true
      return usuario;
    }else{
      this.check=false;
      return null;
    }
  }

  logOut(){
    sessionStorage.removeItem("currentUser")
  }

}
