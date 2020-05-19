import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FirebaseAuthentication } from "@ionic-native/firebase-authentication/ngx";

import { IonicModule } from "@ionic/angular";

import { RecuperarPageRoutingModule } from "./recuperar-routing.module";

import { RecuperarPage } from "./recuperar.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RecuperarPageRoutingModule],
  declarations: [RecuperarPage],
})
export class RecuperarPageModule {}
