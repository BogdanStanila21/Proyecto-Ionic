import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelecionarMiProductoPage } from './selecionar-mi-producto.page';

const routes: Routes = [
  {
    path: '',
    component: SelecionarMiProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelecionarMiProductoPageRoutingModule {}
