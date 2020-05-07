import { Component } from '@angular/core';
import { LoginService } from './../service/login.service';
import { UsuarioModel } from './../models/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuario:UsuarioModel
  constructor(private auth: LoginService) {
    this.usuarioLogeado();
  }

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  }

}
