import { Component, OnInit } from "@angular/core";
import { FirebaseAuthentication } from "@ionic-native/firebase-authentication/ngx";

@Component({
  selector: "app-recuperar",
  templateUrl: "./recuperar.page.html",
  styleUrls: ["./recuperar.page.scss"],
})
export class RecuperarPage implements OnInit {
  public email: String = "";
  constructor(private firebaseAuthentication: FirebaseAuthentication) {}
  ngOnInit() {}

  recuperarContraseña() {
    alert("POLLA");
  }
}
