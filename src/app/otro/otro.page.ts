import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './../service/usuario.service';
import { ArticuloService } from './../service/articulo.service';
import { UsuarioModel } from './../models/usuario';
import { Articulo } from './../models/articulo';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-otro',
  templateUrl: './otro.page.html',
  styleUrls: ['./otro.page.scss'],
})
export class OtroPage implements OnInit {

  public idUsuario=null;
  public usuario:UsuarioModel[];
  public articulos:Articulo[];
  public usuarioLog: UsuarioModel;
  constructor(private activatedRoute: ActivatedRoute, private usuarioService:UsuarioService, private articulosService:ArticuloService, private auth: LoginService, private router:Router) { }

  usuarioLogeado(){
    this.usuarioLog=this.auth.usuarioId;
    console.log(this.usuarioLog)
  }

  getUsuario(){
    this.usuarioService.getUsuario(this.idUsuario).subscribe((data:UsuarioModel[])=>{
      this.usuario=data
    })
  }
  getArticulos(){
    this.articulosService.getArticulo(this.idUsuario).subscribe((data:Articulo[])=>{
      this.articulos=data;
      console.log(this.articulos)
    })
  }

  verArticulo(articuloId){
    this.router.navigate(['/info-articulo', articuloId])
  }

  ngOnInit() {
    this.idUsuario=this.activatedRoute.snapshot.paramMap.get('id')
    this.usuarioLogeado();
    this.getUsuario();
    this.getArticulos();
  }

}
