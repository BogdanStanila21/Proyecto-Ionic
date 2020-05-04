import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "perfil",
    loadChildren: () =>
      import("./perfil/perfil.module").then((m) => m.PerfilPageModule),
  },
  {
    path: "menu",
    loadChildren: () =>
      import("./menu/menu.module").then((m) => m.MenuPageModule),
  },
  {
    path: "editar-perfil",
    loadChildren: () =>
      import("./editar-perfil/editar-perfil.module").then(
        (m) => m.EditarPerfilPageModule
      ),
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
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'intercambio',
    loadChildren: () => import('./intercambio/intercambio.module').then( m => m.IntercambioPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },  {
    path: 'selecionar-mi-producto',
    loadChildren: () => import('./selecionar-mi-producto/selecionar-mi-producto.module').then( m => m.SelecionarMiProductoPageModule)
  },
  {
    path: 'chat-general',
    loadChildren: () => import('./chat-general/chat-general.module').then( m => m.ChatGeneralPageModule)
  },

]
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
