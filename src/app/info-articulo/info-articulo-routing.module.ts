import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoArticuloPage } from './info-articulo.page';

const routes: Routes = [
  {
    path: '',
    component: InfoArticuloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoArticuloPageRoutingModule {}
