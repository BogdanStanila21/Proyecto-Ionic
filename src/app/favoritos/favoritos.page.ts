import { Component, OnInit } from '@angular/core';
import { LoginService } from './../service/login.service';
import { UsuarioModel } from './../models/usuario';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  public usuario:UsuarioModel
  constructor( private auth:LoginService) { }

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  }

  ngOnInit() {
    this.usuarioLogeado();
  }

}
