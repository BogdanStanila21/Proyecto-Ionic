import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../service/usuario.service';
import { UsuarioModel } from './../models/usuario';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { passValidation } from "./custom-validator";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss']
})
export class RegistroPage implements OnInit {

  registroForm:FormGroup;

  constructor(private usuarioService:UsuarioService, private router:Router, private fb:FormBuilder, public toastController:ToastController) { 
    this.buildForm(); 
  }

  buildForm(){
    this.registroForm=this.fb.group(
      {
        nick:new FormControl(null,[
          Validators.minLength(4),
          Validators.maxLength(12),
          Validators.required
        ]),
        nombre:new FormControl(null,[
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.required
        ]),
        email:new FormControl(null,[
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
          Validators.required
        ]),
        lugar:new FormControl("",[
          Validators.required
        ]),
        contrasenya:new FormControl("",[
          Validators.required,
          Validators.pattern("(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}")
        ]),
        contrasenya2:new FormControl("",[
          Validators.required,
          Validators.pattern("(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}")
        ])
      },{
        validators:passValidation.matchPass
      }
    )
  }

  postUsuario(nick:string, nombre:string, email:string, lugar:string, contrasenya:string){
    let usuario=new UsuarioModel;
    usuario.nick=nick;
    usuario.nombre=nombre;
    usuario.email=email;
    usuario.lugar=lugar;
    usuario.contrasenya=contrasenya;
    return this.usuarioService.postUsuario(usuario).subscribe((data)=>{
      console.log(data);
      this.router.navigate(['/login'])
      this.presentToastConfirmation
    })
  }

  async presentToastConfirmation() {
    const toast = await this.toastController.create({
      message: 'Usuario registrado satisfactoriamente',
      color:'success',
      position:'top',
      duration: 2000
    });
    toast.present();
  }

  onSubmit() {
    console.log(this.registroForm.value);
  }

  ngOnInit() {
  }

}
