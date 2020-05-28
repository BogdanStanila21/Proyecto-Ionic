import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "./../service/usuario.service";
import { UsuarioModel } from "./../models/usuario";
import { Router } from "@angular/router";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.page.html",
  styleUrls: ["./registro.page.scss"],
})
export class RegistroPage implements OnInit {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  postUsuario(
    nick: string,
    nombre: string,
    email: string,
    lugar: string,
    contrasenya: string
  ) {
    let usuario = new UsuarioModel();
    usuario.nick = nick;
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.lugar = lugar;
    usuario.contrasenya = contrasenya;
    console.log(usuario);
    return this.usuarioService.postUsuario(usuario).subscribe((data) => {
      console.log(data);
      this.router.navigate(["/login"]);
    });
  }

  // enviar("geafalconjoseantonio@gmail.com");

  ngOnInit() {}
}
