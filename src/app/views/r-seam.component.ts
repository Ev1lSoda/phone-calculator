import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

import { CalcStateService } from "../service/calc-state.service";

@Component({
  selector: "r-seam",
  templateUrl: "./r-seam.component.html",
  styleUrls: ["./r-seam.component.css"]
})
export class RSeamComponent implements OnInit {
  public seamResults = [];
  public helper = [];
  public results = {
    mass: 0,
    gMass: 0
  };

  constructor(
    private calcService: CalcStateService,
    private _routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.seamResults = this.calcService.getSeams().results;
    // { "seamWD": 10, "len": 2015.9999999999998, "mass": 2.60064, "gMass": 0.39 }
    let gMass = 0,
      mass = 0;
    for (let sr of this.seamResults) {
      gMass += sr["gMass"];
      mass += sr["mass"];
      if (this.results.hasOwnProperty(sr["seamWD"])) {
        // @ts-ignore
        this.results[sr["seamWD"]] += this.roundNum(sr["len"]);
      } else {
        this.helper.push(sr["seamWD"]);
        this.results[sr["seamWD"]] = this.roundNum(sr["len"]);
      }
    }
    // @ts-ignore
    this.results["mass"] = this.roundNum(mass);
    // @ts-ignore
    this.results["gMass"] = this.roundNum(gMass);
  }

  roundNum(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  onBackTap(): void {
    this._routerExtensions.back();
  }
}