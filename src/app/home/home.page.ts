import { Component, OnInit } from '@angular/core';
import { HomeserviceService } from '../shared/homeservice.service';
import { Router } from '@angular/router';
import { LoginService } from './../service/login.service';
import { UsuarioModel } from './../models/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // list_original = [
  //   "item 1",
  //   "item 2",
  //   "item 3",
  //   "item 4",
  //   "hola",
  //   "maria",
  //   "JAUSUDSADI",
  // ];
  // list_to_show = this.articulos;
  // selected_index = -1;
  // show_list = true;

  public articulos: any;
  public usuario: UsuarioModel;

  list_to_show = this.articulos;
  selected_index = -1;
  show_list = true;

  constructor(private api: HomeserviceService, private router: Router, private auth: LoginService) {}

  onCancel(val) {
    this.show_list = false;
  }

  click_bar() {
    this.show_list = true;
  }

  // click_item(val) {
  //   for (let i = 0; i < this.list_original.length; i++) {
  //     if (
  //       this.list_to_show[val].toUpperCase() ===
  //       this.list_original[i].toUpperCase()
  //     ) {
  //       this.selected_index = i;
  //       break;
  //     }
  //   }
  //   this.show_list = false;
  // }

  change_query(query) {
    let k = 0;
    this.list_to_show = [];
    for (let i = 0; i < this.articulos.length; i++) {
      if (this.articulos[i].nombre.toUpperCase().includes(query.toUpperCase())) {
        this.list_to_show[k] = this.articulos[i].nombre;
        k += 1;
      }
    }
  }


  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  }

  mostrarTodos() {
    this.api.getTodos(this.usuario.usuario_id).subscribe((data: any) => {
      this.articulos = data;
      console.log(data);
    });
  }

  mostrarInfo(articulo_id: Number){
      this.router.navigate(['/info-articulo', articulo_id])
  }

  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  ngOnInit() {
    this.usuarioLogeado();
    this.mostrarTodos();

  }
  
}
