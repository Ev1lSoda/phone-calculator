import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { SeamComponent } from "./seam.component";
import { RSeamComponent } from "./r-seam.component";

const routes: Routes = [
  { path: "default", component: SeamComponent },
  { path: "default/rseam", component: RSeamComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class SeamRoutingModule {}
