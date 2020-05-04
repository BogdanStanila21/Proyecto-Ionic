import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubirArticuloPageRoutingModule } from './subir-articulo-routing.module';

import { SubirArticuloPage } from './subir-articulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubirArticuloPageRoutingModule
  ],
  declarations: [SubirArticuloPage]
})
export class SubirArticuloPageModule {}
