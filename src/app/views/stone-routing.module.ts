import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { StoneComponent } from "./stone.component";
import { RStoneComponent } from "./r-stone.component";

const routes: Routes = [
  { path: "default", component: StoneComponent },
  { path: "default/rstone", component: RStoneComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class StoneRoutingModule {}
