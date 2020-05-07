import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeserviceService } from '../shared/homeservice.service';

@Component({
  selector: 'app-info-articulo',
  templateUrl: './info-articulo.page.html',
  styleUrls: ['./info-articulo.page.scss'],
})
export class InfoArticuloPage implements OnInit {

  public idArticulo = null;
  public articulo: any;

  constructor(private activatedRoute: ActivatedRoute, private homeservice: HomeserviceService) { }

  mostrarInfo(){
    this.homeservice.getArticulo(this.idArticulo).subscribe((data: any) => {
      console.log(data);
      this.articulo = data;
    })
  }


  ngOnInit() {
    this.idArticulo = this.activatedRoute.snapshot.paramMap.get("id");
    this.mostrarInfo();
  }

}
