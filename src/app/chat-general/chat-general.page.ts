import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { ChatModel } from './../models/chat';
import { UsuarioService } from './../service/usuario.service';
import { UsuarioModel } from '../models/usuario';
import { LoginService } from './../service/login.service';


@Component({
  selector: 'app-chat-general',
  templateUrl: './chat-general.page.html',
  styleUrls: ['./chat-general.page.scss'],
})
export class ChatGeneralPage implements OnInit {

  public id:number;
  public idUsuario:number[]=[];
  public nickUsuario:object[]=[];
  public mensajes:ChatModel[];
  public ultimoMensaje:string[]=[];
  public usuario:UsuarioModel;
  public timers:any=setInterval(()=>{this.verTodosLosChat()},500);

  constructor(private chatService:ChatService, private usuarioService:UsuarioService, private auth:LoginService) { }

  //Usuario actual
  usuarioLogeado(){
    this.id=this.auth.usuarioId.usuario_id;
    this.usuario=this.auth.usuarioId;//usuario logeado
  }

  //Comprueba los chat que tiene el usuario y guarda el id del usuario con el que chatea
  verTodosLosChat(){
    return this.chatService.getChat(this.id).subscribe((data:ChatModel[])=>{
      this.mensajes=data
      for(let i=0;i<data.length;i++){
        if(data[i].usuario_realiza!=this.id){
          if(this.idUsuario.includes(data[i].usuario_realiza)){
            console.log("existe")
          }else{
            this.idUsuario.push(data[i].usuario_realiza);
          }
         
        }
        if(data[i].usuario_recibe!=this.id){
          if(this.idUsuario.includes(data[i].usuario_recibe)){
            console.log("existe")
          }else{
            this.idUsuario.push(data[i].usuario_recibe)
          }
        }
      }
      console.log(this.idUsuario)
    })
  }


  //compara los id que hemos obtenido antes con los que hay en la base de datos 
  // y almacena los datos de cada usuario para monstrar el nombre en el chat general
  getUsuarioNick(){
    return this.usuarioService.getUsuarios().subscribe((data:UsuarioModel[])=>{
      console.log(data)
      setInterval(()=>{
        for(let i=0;i<data.length;i++){
          for(let j=0;j<this.idUsuario.length;j++){
            if(data[i].usuario_id===this.idUsuario[j]){
              if(this.nickUsuario.includes(data[i])){
                console.log("existe")
              }else{
                this.nickUsuario.push(data[i])
              }
              
            }
          }
        }
      },500)
      console.log(this.nickUsuario)
    })
  }

  ngOnInit() {
    this.usuarioLogeado();
    this.verTodosLosChat();
    this.getUsuarioNick();
  }

}
