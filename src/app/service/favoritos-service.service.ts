import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FavoritoTable } from './../models/favorito-table';

@Injectable({
  providedIn: 'root'
})
export class FavoritosServiceService {

  private url = "http://localhost:3000/favoritos"
  constructor(private http: HttpClient) { }

  getFavoritos(usuarioId: number) {
    return this.http.get(this.url + "/" + usuarioId)
  }
  getFavParaInfo(usuarioId: number) {
    return this.http.get(this.url + "/" + usuarioId)
  }

  postfavorito(favorito:FavoritoTable){
    return this.http.post(this.url,favorito)
  }

  deleteFavorito(articuloId) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { favoritos_id: articuloId },
    }
    return this.http.delete(this.url,options)
  }
}
