import { Component, OnInit } from '@angular/core';
import { LoginModel } from './../models/login';
import { LoginService } from './../service/login.service';
import { UsuarioModel } from './../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth:LoginService,private router:Router) { }

  login(email:string, contrasenya:string){
    let usuario=new LoginModel;
    usuario.email=email;
    usuario.contrasenya=contrasenya;

    this.auth.authLogin(usuario).subscribe((data:UsuarioModel[])=>{
      this.auth.usuarioId=data[0]
      if(this.auth.usuarioId===undefined){
        this.router.navigate(['/login'])
      }else{
        this.auth.check=true
        this.auth.setUser(data[0])
        this.router.navigate(['/home'])
      }
    })    

  }

  ngOnInit() {
  }

}
