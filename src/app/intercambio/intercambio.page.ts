import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModel } from './../models/usuario';
import { LoginService } from './../service/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-intercambio',
  templateUrl: './intercambio.page.html',
  styleUrls: ['./intercambio.page.scss'],
})
export class IntercambioPage implements OnInit {
  public usuario:UsuarioModel
 

  constructor(private auth:LoginService, public alertController: AlertController) { }

  usuarioLogeado(){
    this.usuario=this.auth.usuarioId;
  };

  




  ngOnInit() {
    this.usuarioLogeado();
  }

}
