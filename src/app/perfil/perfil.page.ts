import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { LoginService } from './../service/login.service';
import { Router } from '@angular/router';
import { UsuarioModel } from './../models/usuario';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
})
export class PerfilPage {

  public usuario:UsuarioModel
  constructor(private menu: MenuController, private auth:LoginService, private router:Router) {}

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  }

  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }

  openEnd() {
    this.menu.open("end");
  }

  openCustom() {
    this.menu.enable(true, "custom");
    this.menu.open("custom");
  }

  cerrarSesion(){
    this.auth.logOut() 
    window.location.reload();
  }

  ngOnInit() {
    this.usuarioLogeado();
  }
}
