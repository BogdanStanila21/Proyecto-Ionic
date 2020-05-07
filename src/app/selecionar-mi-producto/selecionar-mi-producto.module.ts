import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelecionarMiProductoPageRoutingModule } from './selecionar-mi-producto-routing.module';

import { SelecionarMiProductoPage } from './selecionar-mi-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelecionarMiProductoPageRoutingModule
  ],
  declarations: [SelecionarMiProductoPage]
})
export class SelecionarMiProductoPageModule {}
