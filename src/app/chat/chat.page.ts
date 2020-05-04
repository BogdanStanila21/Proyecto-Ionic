import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from './../service/chat.service';
import { ChatModel } from '../models/chat'
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild('content', { static: false }) content: IonContent;

  public id:number=1;
  public chat:ChatModel[]=[];
  public timers:any=setInterval(()=>{this.verChat()},500);
  
  constructor( private chatService:ChatService) {  }

  verChat(){
     return this.chatService.getChat(this.id).subscribe((data:ChatModel[])=>{   
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
    mensaje.usuario_recibe=3;
    mensaje.mensaje=texto;

    return this.chatService.postChat(mensaje).subscribe((data)=>{
      console.log(data);
    })
  }

  scrollToBottomOnInit() {
    setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom(100);
        }
    }, 500);
  }

  ngOnInit() {
    this.scrollToBottomOnInit()
  }

}
