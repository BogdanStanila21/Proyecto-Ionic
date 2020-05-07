import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  {

  constructor(private modalCtrl:ModalController) { }

  dismissModal(){
    this.modalCtrl.dismiss()
  }
    

}

