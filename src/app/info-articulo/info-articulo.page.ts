import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HomeserviceService } from "../shared/homeservice.service";
import { UsuarioModel } from "./../models/usuario";
import { LoginService } from "./../service/login.service";

@Component({
  selector: "app-info-articulo",
  templateUrl: "./info-articulo.page.html",
  styleUrls: ["./info-articulo.page.scss"],
})
export class InfoArticuloPage implements OnInit {
  public idArticulo = null;
  public articulo: any;
  public usuario: UsuarioModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private homeservice: HomeserviceService,
    private auth: LoginService
  ) {}

  usuarioLogeado() {
    this.usuario = this.auth.usuarioId;
  }

  mostrarInfo() {
    this.homeservice.getArticulo(this.idArticulo).subscribe((data: any) => {
      console.log(data);
      this.articulo = data;
    });
  }

  ngOnInit() {
    this.idArticulo = this.activatedRoute.snapshot.paramMap.get("id");
    this.usuarioLogeado();
    this.mostrarInfo();
  }
}
