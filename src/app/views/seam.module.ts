import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { SeamRoutingModule } from "./seam-routing.module";
import { SeamComponent } from "./seam.component";
import { RSeamComponent } from './r-seam.component';

@NgModule({
  imports: [NativeScriptCommonModule, SeamRoutingModule],
  declarations: [SeamComponent, RSeamComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SeamModule {}
