import { Component, OnInit } from '@angular/core';
import { LoginModel } from './../models/login';
import { LoginService } from './../service/login.service';
import { UsuarioModel } from './../models/usuario';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
 
  loginForm:FormGroup

  constructor(private auth:LoginService,private router:Router, private fb:FormBuilder, private toastController:ToastController) {
    this.buildForm();
   }

  buildForm(){
    this.loginForm=this.fb.group({
      email:new FormControl("",[
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}"),
        Validators.required
      ]),
      contrasenya:new FormControl("",[
        Validators.pattern("(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}"),
        Validators.required
      ])
    })
  }

  async presentToastInvalid() {
    const toast = await this.toastController.create({
      message: 'Email o contraseña invalido',
      color:'danger',
      position:'top',
      duration: 2000
    });
    toast.present();
  }

  login(email:string, contrasenya:string){
    let usuario=new LoginModel;
    usuario.email=email;
    usuario.contrasenya=contrasenya;

    this.auth.authLogin(usuario).subscribe((data:UsuarioModel[])=>{
      this.auth.usuarioId=data[0]
      if(this.auth.usuarioId===undefined){
        this.router.navigate(['/login'])
        this.presentToastInvalid();
      }else{
        this.auth.check=true
        this.auth.setUser(data[0])
        this.router.navigate(['/home'])
      }
    });
  }

  ngOnInit() {}
}
