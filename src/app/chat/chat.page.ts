import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from './../service/chat.service';
import { ChatModel } from '../models/chat'
import { IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UnaConversacionModel } from '../models/chat';
import { LoginService } from './../service/login.service';
import { UsuarioModel } from './../models/usuario';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild('content', { static: false }) content: IonContent;

  public id:number;
  public chat:ChatModel[]=[];
  public timers:any=setInterval(()=>{this.verChat()},500);
  public usuarioId=null;
  public usuario:UsuarioModel;
  
  constructor( private chatService:ChatService, private activatedRoute:ActivatedRoute, private auth:LoginService) {  }


  usuarioLogeado(){
    this.id=this.auth.usuarioId.usuario_id;
    this.usuario=this.auth.usuarioId;
  }

  verChat(){
    let ids=new UnaConversacionModel;
    ids.usuario_id=this.id;
    ids.id=this.usuarioId;
     return this.chatService.getUnaConversacion(ids).subscribe((data:ChatModel[])=>{   
        if(this.chat.length==data.length){
          console.log("Nada nuevo")
        }else{
          this.chat=data;
          this.scrollToBottomOnInit()
        }
    })
  }

  enviarChat(texto:string){
    let mensaje=new ChatModel;
    mensaje.usuario_realiza=this.id;
    mensaje.usuario_recibe=this.usuarioId;
    mensaje.mensaje=texto;

    return this.chatService.postChat(mensaje).subscribe((data)=>{
      console.log(data);
    })
  }

  scrollToBottomOnInit() {
    setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom(0);
        }
    }, 500);
  }

  ngOnInit() {
    this.usuarioLogeado();
    this.scrollToBottomOnInit()
    this.usuarioId=this.activatedRoute.snapshot.paramMap.get('id');
    this.verChat()
  }

}
