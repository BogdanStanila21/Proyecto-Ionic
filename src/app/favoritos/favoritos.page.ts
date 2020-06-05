import { Component, OnInit } from '@angular/core';
import { LoginService } from './../service/login.service';
import { UsuarioModel } from './../models/usuario';
import { FavoritosServiceService } from './../service/favoritos-service.service';
import { Router } from '@angular/router';
import { FavoritoTable } from './../models/favorito-table';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  public usuario:UsuarioModel;
  public favoritos:FavoritoTable[]=[];
  constructor( private auth:LoginService, private favoritosService:FavoritosServiceService, private router:Router) { }

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  }

  verFavoritos(){
    return this.favoritosService.getFavoritos(this.usuario.usuario_id).subscribe((data:FavoritoTable[])=>{
      this.favoritos=data;
      console.log(data)
    })
  }


  eliminarFavorito(idFavorito:number){
    return this.favoritosService.deleteFavorito(idFavorito).subscribe((data)=>{
      console.log(data)
      this.verFavoritos();
    })
  }

  mostrarInfo(idfavorito){
    this.router.navigate(['/info-articulo',idfavorito])
  }

  doRefresh(event) {
    this.verFavoritos();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  ngOnInit() {
    this.usuarioLogeado();
    this.verFavoritos();
  }

}
