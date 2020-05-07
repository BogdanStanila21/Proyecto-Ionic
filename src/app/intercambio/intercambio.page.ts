import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from './../models/usuario';
import { LoginService } from './../service/login.service';

@Component({
  selector: 'app-intercambio',
  templateUrl: './intercambio.page.html',
  styleUrls: ['./intercambio.page.scss'],
})
export class IntercambioPage implements OnInit {

  public usuario:UsuarioModel
  constructor(private auth:LoginService) { }

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  }

  ngOnInit() {
    this.usuarioLogeado();
  }

}
