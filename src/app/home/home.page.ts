import { Component, OnInit } from '@angular/core';
import { HomeserviceService } from '../shared/homeservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public articulos: any;

  constructor(private api: HomeserviceService, private router: Router) {}

  mostrarTodos() {
    this.api.getTodos(1).subscribe((data: any) => {
      this.articulos = data;
      console.log(data);
    });
  }

  mostrarInfo(articulo_id: Number){
      this.router.navigate(['/info-articulo', articulo_id])
  }

  ngOnInit() {
    this.mostrarTodos();
  }

}
