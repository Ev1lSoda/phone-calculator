import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { StoneRoutingModule } from "./stone-routing.module";

import { StoneComponent } from "./stone.component";
import { RStoneComponent } from "./r-stone.component";

@NgModule({
  imports: [NativeScriptCommonModule, StoneRoutingModule],
  declarations: [StoneComponent, RStoneComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class StoneModule {}
