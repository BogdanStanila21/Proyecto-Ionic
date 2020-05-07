import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PerfilPageRoutingModule } from "./perfil-routing.module";

import { PerfilPage } from "./perfil.page";
import { ModalComponent } from '../modal/modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PerfilPageRoutingModule],
  declarations: [PerfilPage, ModalComponent], 
  entryComponents: [ModalComponent]
})
export class PerfilPageModule {}
