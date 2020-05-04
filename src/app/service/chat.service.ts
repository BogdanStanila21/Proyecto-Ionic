import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatModel } from '../models/chat'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url="http://localhost:3000/chat";

  constructor(private http:HttpClient) { }

  getChat(id){
  return this.http.get(this.url + "/" + id)
  }

  postChat(mensaje:ChatModel){
    return this.http.post(this.url,mensaje)
  }

}
