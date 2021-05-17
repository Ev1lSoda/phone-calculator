import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import {
  NativeScriptRouterModule,
  NSEmptyOutletComponent
} from "@nativescript/angular";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/(seamTab:seam/default//stoneTab:stone/default)",
    pathMatch: "full"
  },
  {
    path: "seam",
    component: NSEmptyOutletComponent,
    loadChildren: () =>
      import("~/app/views/seam.module").then(m => m.SeamModule),
    outlet: "seamTab"
  },
  {
    path: "stone",
    component: NSEmptyOutletComponent,
    loadChildren: () =>
      import("~/app/views/stone.module").then(m => m.StoneModule),
    outlet: "stoneTab"
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
