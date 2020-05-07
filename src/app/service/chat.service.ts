import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatModel } from '../models/chat';
import { UnaConversacionModel } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = "http://localhost:3000/chat";
  private url2 = "http://localhost:3000/michat";

  constructor(private http: HttpClient) { }

  getChat(id) {
    return this.http.get(this.url + "/" + id)
  }

  postChat(mensaje: ChatModel) {
    return this.http.post(this.url, mensaje)
  }

  getUnaConversacion(id:UnaConversacionModel) {
    
    return this.http.post(this.url2,id)
  }

}
