import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "bienvenida",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "perfil",
    loadChildren: () =>
      import("./perfil/perfil.module").then((m) => m.PerfilPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "menu",
    loadChildren: () =>
      import("./menu/menu.module").then((m) => m.MenuPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "editar-perfil",
    loadChildren: () =>
      import("./editar-perfil/editar-perfil.module").then(
        (m) => m.EditarPerfilPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "registro",
    loadChildren: () =>
      import("./registro/registro.module").then((m) => m.RegistroPageModule),
  },
  {
    path: "historial",
    loadChildren: () =>
      import("./historial/historial.module").then((m) => m.HistorialPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "info-articulo/:id",
    loadChildren: () =>
      import("./info-articulo/info-articulo.module").then(
        (m) => m.InfoArticuloPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "bienvenida",
    loadChildren: () =>
      import("./bienvenida/bienvenida.module").then(
        (m) => m.BienvenidaPageModule
      ),
  },
  {
    path: "subir-articulo",
    loadChildren: () =>
      import("./subir-articulo/subir-articulo.module").then(
        (m) => m.SubirArticuloPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "chat/:id",
    loadChildren: () =>
      import("./chat/chat.module").then((m) => m.ChatPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "intercambio",
    loadChildren: () =>
      import("./intercambio/intercambio.module").then(
        (m) => m.IntercambioPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "favoritos",
    loadChildren: () =>
      import("./favoritos/favoritos.module").then((m) => m.FavoritosPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "selecionar-mi-producto/:articulo_id",
    loadChildren: () =>
      import("./selecionar-mi-producto/selecionar-mi-producto.module").then(
        (m) => m.SelecionarMiProductoPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "chat-general",
    loadChildren: () =>
      import("./chat-general/chat-general.module").then(
        (m) => m.ChatGeneralPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "otro/:id",
    loadChildren: () =>
      import("./otro/otro.module").then((m) => m.OtroPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    redirectTo: "login",
    pathMatch: "full",
  },
];

// ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
