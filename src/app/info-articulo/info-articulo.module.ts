import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoArticuloPageRoutingModule } from './info-articulo-routing.module';

import { InfoArticuloPage } from './info-articulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoArticuloPageRoutingModule
  ],
  declarations: [InfoArticuloPage]
})
export class InfoArticuloPageModule {}
