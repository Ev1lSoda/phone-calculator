import { Component, OnInit } from "@angular/core";
import { ScrollView, ScrollEventData } from "@nativescript/core";

@Component({
  selector: "Seam",
  templateUrl: "./seam.component.html",
  styleUrls: ["./seam.component.css"]
})
export class SeamComponent implements OnInit {
  public curDkz: any;

  constructor() {}

  ngOnInit(): void {}
  onScroll(args: ScrollEventData) {
    const scrollView = args.object as ScrollView;
  }
  pickHermetic(dkz: number): void {
    if (dkz > -1) {
      this.curDkz = dkz;
      // this.indexOfCurHer = -1;
      // this.calcInfo.den = -1;
      // // let curContainer = this.calcService.bSubj.getValue();

      // if (this.hermetic[dkz]['her'].length === 2) {
      //   this.curHermetic.single = '';
      //   this.curHermetic.one = this.hermetic[dkz]['her'][0];
      //   this.curHermetic.two = this.hermetic[dkz]['her'][1];
      //   // curContainer.seam.inputs[1]['dkz'] = dkz;
      // } else {
      //   this.curHermetic.one = '';
      //   this.curHermetic.two = '';
      //   this.curHermetic.single = this.hermetic[dkz]['her'][0];
      // }
    }
  }
}
