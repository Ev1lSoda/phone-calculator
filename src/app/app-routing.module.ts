import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import {
  NativeScriptRouterModule,
  NSEmptyOutletComponent
} from "@nativescript/angular";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/(seamTab:seam/default//searchTab:search/default)",
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
    path: "search",
    component: NSEmptyOutletComponent,
    loadChildren: () =>
      import("~/app/search/search.module").then(m => m.SearchModule),
    outlet: "searchTab"
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
