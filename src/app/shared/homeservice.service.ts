import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HomeserviceService {
  private url = "http://localhost:3000/articulos";
  private url2 = "http://localhost:3000/articulo";
  private url3 = "http://localhost:3000";
  constructor(private http: HttpClient) {}

  getTodos(usuario: Number) {
    return this.http.get(this.url + "/" + usuario);
  }

  gettype(categoria) {
    console.log(this.http.get(this.url3 + "/" + categoria));
    return this.http.get(this.url3 + "/" + categoria);
  }

  getArticulo(articulo: Number) {
    return this.http.get(this.url2 + "/" + articulo);
  }
}
