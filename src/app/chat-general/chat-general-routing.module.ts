import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatGeneralPage } from './chat-general.page';

const routes: Routes = [
  {
    path: '',
    component: ChatGeneralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatGeneralPageRoutingModule {}
