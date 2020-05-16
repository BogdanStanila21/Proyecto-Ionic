import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeserviceService } from '../shared/homeservice.service';
import { UsuarioModel } from './../models/usuario';
import { LoginService } from './../service/login.service';
import { FavoritoTable } from './../models/favorito-table';
import { FavoritosServiceService } from './../service/favoritos-service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-info-articulo',
  templateUrl: './info-articulo.page.html',
  styleUrls: ['./info-articulo.page.scss'],
})
export class InfoArticuloPage implements OnInit {

  public idArticulo = null;
  public articulo: any;
  public usuario:UsuarioModel

  constructor(private activatedRoute: ActivatedRoute, private homeservice: HomeserviceService, private auth:LoginService, private router:Router, private favoritoService:FavoritosServiceService, public toastController: ToastController) { }

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  }

  mostrarInfo(){
    this.homeservice.getArticulo(this.idArticulo).subscribe((data: any) => {
      console.log(data);
      this.articulo = data;
    })
  }

  verUsuario(id:number){
    this.router.navigate(['/otro',id])
  }

  crearfavorito(){
    let favorito=new FavoritoTable;
    favorito.usuario_id=this.usuario.usuario_id;
    favorito.articulo_id=this.idArticulo;
    let misFavoritos:FavoritoTable[];
    this.favoritoService.getFavParaInfo(this.usuario.usuario_id).subscribe((data:FavoritoTable[])=>{
      misFavoritos=data;
      let existe=false;
      for(let i=0;i<misFavoritos.length;i++){
        if (misFavoritos[i].articulo_id==favorito.articulo_id){
          existe=true;
        }
      }
      if(!existe){
        return this.favoritoService.postfavorito(favorito).subscribe((data)=>{
          console.log(data);
          this.presentToastConfirmacion();
        })
      }else{
        this.presentToastExiste();
      }
    })
    
  }

  crearPeticion(articuloId:number){
    this.router.navigate(['/selecionar-mi-producto', articuloId])
  }

  async presentToastConfirmacion() {
    const toast = await this.toastController.create({
      message: 'Articulo agreagdo a favoritos',
      duration: 2000,
      color:"success",
      position:"middle"
    });
    toast.present();
  }

  async presentToastExiste() {
    const toast = await this.toastController.create({
      message: 'El artículo ya esta en favoritos',
      duration: 2000,
      color:'warning',
      position:"middle"
    });
    toast.present();
  }

  ngOnInit() {
    this.idArticulo = this.activatedRoute.snapshot.paramMap.get("id");
    this.usuarioLogeado();
    this.mostrarInfo();
  }

}
