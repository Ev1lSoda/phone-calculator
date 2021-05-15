import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { SeamRoutingModule } from "./seam-routing.module";
import { SeamComponent } from "./seam.component";

@NgModule({
  imports: [NativeScriptCommonModule, SeamRoutingModule],
  declarations: [SeamComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SeamModule {}
