import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from './../models/usuario';
import { LoginService } from './../service/login.service';

@Component({
  selector: 'app-selecionar-mi-producto',
  templateUrl: './selecionar-mi-producto.page.html',
  styleUrls: ['./selecionar-mi-producto.page.scss'],
})
export class SelecionarMiProductoPage implements OnInit {

  public usuario:UsuarioModel

  constructor(private auth:LoginService) { }

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  }

  ngOnInit() {
    this.usuarioLogeado();
  }

}
