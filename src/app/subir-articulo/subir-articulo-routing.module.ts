import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubirArticuloPage } from './subir-articulo.page';

const routes: Routes = [
  {
    path: '',
    component: SubirArticuloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubirArticuloPageRoutingModule {}
