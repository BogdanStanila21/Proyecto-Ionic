import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatGeneralPageRoutingModule } from './chat-general-routing.module';

import { ChatGeneralPage } from './chat-general.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatGeneralPageRoutingModule
  ],
  declarations: [ChatGeneralPage]
})
export class ChatGeneralPageModule {}
