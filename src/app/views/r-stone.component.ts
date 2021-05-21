import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import * as SocialShare from "@nativescript/social-share";

import { CalcStateService } from "../service/calc-state.service";

@Component({
  selector: "r-stone",
  templateUrl: "./r-stone.component.html",
  styleUrls: ["./r-stone.component.css"]
})
export class RStoneComponent implements OnInit {
  public seamResults = [];
  public results = { Msh1020: 0, Msh510: 0, Msh35: 0, Mgr: 0, MmCP: 0 };
  private textForSocialShare = ``;

  constructor(
    private calcService: CalcStateService,
    private _routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    // { "Msh1020": 29.807999999999996, "Msh510": 108, "Msh35": 900, "Mgr": 0.27, "MmCP": 11.3792112 }
    this.seamResults = this.calcService.getStones().results;
    let Msh1020 = 0,
      Msh510 = 0,
      Msh35 = 0,
      Mgr = 0,
      MmCP = 0;
    for (let sr of this.seamResults) {
      Msh1020 += sr["Msh1020"];
      Msh510 += sr["Msh510"];
      Msh35 += sr["Msh35"];
      Mgr += sr["Mgr"];
      MmCP += sr["MmCP"];
    }
    this.results = {
      Msh1020: this.roundNum(Msh1020),
      Msh510: this.roundNum(Msh510),
      Msh35: this.roundNum(Msh35),
      Mgr: this.roundNum(Mgr),
      MmCP: this.roundNum(MmCP)
    };
    this.textForSocialShare += `
    Мщ10-20: ${this.results["Msh1020"]}
    Мщ5-10: ${this.results["Msh510"]}
    Мщ3-5: ${this.results["Msh35"]}
    Мгр: ${this.results["Mgr"]}
    МмСР: ${this.results["MmCP"]}
    `;
  }

  onShareText() {
    SocialShare.shareText(
      this.textForSocialShare,
      "How would you like to share this text?"
    );
  }

  roundNum(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  onBackTap(): void {
    this._routerExtensions.back();
  }
}
