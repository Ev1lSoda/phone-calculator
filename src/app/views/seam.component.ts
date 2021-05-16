import { Component, OnInit } from "@angular/core";
import { TextField } from "@nativescript/core";

import { CalcStateService } from "../service/calc-state.service";
import { Calculations } from "../classes/calculations";

@Component({
  selector: "Seam",
  templateUrl: "./seam.component.html",
  styleUrls: ["./seam.component.css"]
})
export class SeamComponent implements OnInit {
  public curHermetic = {
    single: "",
    one: "",
    two: ""
  };

  public calcInfo = {
    den: -1,
    seamLength: -1,
    seamWidth: -1,
    seamDepth: 0,
    seamCastDepth: -1
  };

  private hermetic = [
    {
      her: ["БП-Г50", "NORD"],
      den: [1.29, 1.12]
    },
    {
      her: ["БП-Г50", "NORD"],
      den: [1.29, 1.12]
    },
    {
      her: ["БП-Г35", "Арктик-3"],
      den: [1.21, 1.09]
    },
    {
      her: ["БП-Г35", "Арктик-3"],
      den: [1.21, 1.09]
    },
    {
      her: ["БП-Г25"],
      den: [1.2]
    }
  ];

  // public seamTotal = 0; // total number of seams defined
  public seamList = []; // list of seams defined: button list
  public wrongLength = false;
  public wrongWidth = false;
  public wrongDepth = false;
  public wrongCastDepth = false;
  public wrongOneOfDepth = true;

  public indexOfCurHer = -1;
  public curDkz: any;
  public curSeamID = -1;
  public seamLength = null;
  public seamWidth = null;
  public seamDepth = null;
  public seamCastDepth = null;

  constructor(private calcService: CalcStateService) {}

  ngOnInit(): void {
    console.log("curCONTlen: ", this.calcService.getSeams().inputs.length);
    this.seamList = this.calcService.getSeams().inputs;
  }
  //РАБОТАЕТ!!!Ч
  warnUser(text: string) {
    alert(text);
  }

  pickHermetic(dkz: number): void {
    if (dkz > -1) {
      this.curDkz = dkz;
      this.indexOfCurHer = -1;
      this.calcInfo.den = -1;
      // let curContainer = this.calcService.bSubj.getValue();

      if (this.hermetic[dkz]["her"].length === 2) {
        this.curHermetic.single = "";
        this.curHermetic.one = this.hermetic[dkz]["her"][0];
        this.curHermetic.two = this.hermetic[dkz]["her"][1];
        // curContainer.seam.inputs[1]['dkz'] = dkz;
      } else {
        this.curHermetic.one = "";
        this.curHermetic.two = "";
        this.curHermetic.single = this.hermetic[dkz]["her"][0];
      }
    }
  }
  getDen(denIndex: number): void {
    this.indexOfCurHer = denIndex;
    this.calcInfo.den = this.hermetic[this.curDkz].den[denIndex];
    console.log(".calcInfo.den: ", this.calcInfo.den);
  }

  // changeDepth(): void {
  //   console.log("changeDepth()|seamDepth: ", this.calcInfo.seamDepth);
  //   console.log("changeDepth()|seamCastDepth: ", this.calcInfo.seamCastDepth);
  //   console.log("changeDepth()|falseorNot: ", this.wrongOneOfDepth);
  //   if (this.calcInfo.seamDepth > 0) {
  //     console.log("changeDepth()|true: ", this.calcInfo.seamDepth);
  //     const seamWidthDemension = Calculations.getSeamWidthDimensions(
  //       this.calcInfo.seamWidth
  //     );
  //     if (this.seamDepth <= seamWidthDemension) {
  //       this.wrongDepth = true;
  //       this.wrongOneOfDepth = true;
  //       console.log(this.wrongOneOfDepth, ": this.wrongOneOfDepth");
  //     } else {
  //       this.wrongDepth = false;
  //       this.wrongOneOfDepth = false;
  //     }
  //     this.calcInfo.seamCastDepth = Number(this.seamDepth) - seamWidthDemension;
  //   }
  // }

  getInputLength(args): void {
    let textField = <TextField>args.object;
    if (textField.text != "" && textField.text != null) {
      this.seamLength = textField.text;
      this.calcInfo.seamLength = Number(this.seamLength);
      console.log("seamLength: ", this.calcInfo.seamLength);
      if (this.seamLength < 1 || this.seamLength > 10000) {
        this.wrongLength = true;
      } else {
        this.wrongLength = false;
      }
    } else {
      this.calcInfo.seamLength = -1;
      this.wrongLength = false;
    }
  }

  getInputWidth(args): void {
    let textField = <TextField>args.object;
    if (textField.text != "" && textField.text != null) {
      this.seamWidth = textField.text;
      this.calcInfo.seamWidth = Number(this.seamWidth);
      let test = Calculations.getSeamWidthDimensions(this.seamWidth);
      console.log("seamWidth: ", this.seamWidth);
      console.log("Calculations: ", test);
      if (this.seamWidth < 5 || this.seamWidth > 38) {
        this.wrongWidth = true;
      } else {
        this.wrongWidth = false;
      }
      if (this.calcInfo.seamDepth > 0 && this.seamDepth <= test) {
        this.wrongDepth = true;
        this.wrongOneOfDepth = true;
      } else if (this.calcInfo.seamDepth > 0 && this.seamDepth <= test) {
        this.wrongDepth = false;
        this.wrongOneOfDepth = false;
      }
      this.calcInfo.seamCastDepth = this.calcInfo.seamDepth - test;
    } else {
      this.calcInfo.seamWidth = -1;
      this.wrongWidth = false;
    }
  }

  getInputDepth(args): void {
    let textField = <TextField>args.object;
    if (textField.text == null) {
    } else if (textField.text == "") {
      this.seamDepth = null;
      this.seamCastDepth = null;
      this.calcInfo.seamDepth = 0;
      this.calcInfo.seamCastDepth = -1;
      this.wrongDepth = false;
      this.wrongCastDepth = false;
      this.wrongOneOfDepth = false;
    } else {
      console.log("getInputDepth|textField.text: ", textField.text);
      this.seamDepth = textField.text;
      this.calcInfo.seamDepth = Number(this.seamDepth);
      console.log("seamDepth: ", this.seamDepth);
      const seamWidthDemension = Calculations.getSeamWidthDimensions(
        this.calcInfo.seamWidth
      );
      if (this.seamDepth <= seamWidthDemension) {
        this.wrongDepth = true;
        this.wrongOneOfDepth = true;
      } else {
        this.wrongDepth = false;
        this.wrongOneOfDepth = false;
      }
      this.calcInfo.seamCastDepth = Number(this.seamDepth) - seamWidthDemension;

      console.log("calcInfo.seamCastDepth: ", this.calcInfo.seamCastDepth);
    }
  }

  getInputCastDepth(args): void {
    let textField = <TextField>args.object;
    if (textField.text == null) {
    } else if (textField.text == "") {
      this.seamDepth = null;
      this.seamCastDepth = null;
      this.calcInfo.seamDepth = 0;
      this.calcInfo.seamCastDepth = -1;
      this.wrongDepth = false;
      this.wrongCastDepth = false;
      this.wrongOneOfDepth = false;
    } else {
      console.log("getInputCastDepth|textField.text: ", textField.text);
      this.seamCastDepth = textField.text;
      console.log("seamCastDepth: ", this.seamCastDepth);
      this.calcInfo.seamCastDepth = Number(this.seamCastDepth);
      this.calcInfo.seamDepth = -1;
      if (
        this.calcInfo.seamCastDepth < 1 ||
        this.calcInfo.seamCastDepth > 1000
      ) {
        this.wrongCastDepth = true;
        this.wrongOneOfDepth = true;
      } else {
        this.wrongCastDepth = false;
        this.wrongOneOfDepth = false;
      }
    }
    console.log("calcInfo.seamDepth: ", this.calcInfo.seamDepth);
  }

  onSaveSeam(): void {
    const newSeam = {
      dkz: this.curDkz, //index
      her: this.indexOfCurHer, //index
      den: this.indexOfCurHer, //index
      seamLength: this.calcInfo.seamLength,
      seamWidth: this.calcInfo.seamWidth,
      seamDepth: this.calcInfo.seamDepth,
      seamCastDepth: this.calcInfo.seamCastDepth
      // seamLength: `${this.seamLength}`,
      // seamWidth: `${this.seamWidth}`,
      // seamDepth: `${this.seamDepth}`,
      // seamCastDepth: `${this.seamCastDepth}`
    };

    const curVolume = Calculations.getVolumeOfHer({
      L: this.calcInfo.seamLength,
      B: this.calcInfo.seamWidth,
      H: this.calcInfo.seamCastDepth
    });
    const curP = this.hermetic[this.curDkz].den[this.indexOfCurHer];

    const newSeamResults = {
      seamWD: Calculations.getSeamWidthDimensions(this.seamWidth),
      len: this.calcInfo.seamLength,
      mass: Calculations.getMassOfHer({ V: curVolume, p: curP }),
      gMass: Calculations.getMassOfGround({ L: newSeam.seamLength })
    };
    this.calcService.saveSeams(newSeam, newSeamResults);
    this.seamList = this.calcService.getSeams().inputs;
    console.log("seamList: ", this.seamList);
    this.onClear();
  }

  getSelectedSeam(seamID: number): void {
    console.log("seamList[seamID]: ", this.seamList[seamID]);

    this.wrongLength = false;
    this.wrongWidth = false;
    this.wrongDepth = false;
    this.wrongCastDepth = false;
    this.wrongOneOfDepth = false;
    this.seamWidth = this.seamList[seamID]["seamWidth"];

    this.indexOfCurHer = this.seamList[seamID]["her"];
    this.curDkz = this.seamList[seamID]["dkz"];
    this.curSeamID = seamID;
    this.seamLength = this.seamList[seamID]["seamLength"];

    this.calcInfo = {
      den: this.hermetic[this.curDkz].den[this.indexOfCurHer],
      seamLength: this.seamList[seamID]["seamLength"],
      seamWidth: this.seamList[seamID]["seamWidth"],
      seamDepth: this.seamList[seamID]["seamDepth"],
      seamCastDepth: this.seamList[seamID]["seamCastDepth"]
    };

    console.log("");

    if (this.calcInfo.seamDepth > 1) {
      this.seamDepth = this.calcInfo.seamDepth;
      this.seamCastDepth = null;
      console.log("IF");
      console.log("seamCastDepth: ", this.seamCastDepth);
      console.log("seamDepth: ", this.seamDepth);
      console.log("calcInfo.seamDepth: ", this.calcInfo.seamDepth);
      console.log("calcInfo.seamCastDepth: ", this.calcInfo.seamCastDepth);
    } else if (this.calcInfo.seamDepth < 1) {
      this.seamDepth = null;
      this.seamCastDepth = this.calcInfo.seamCastDepth;
      console.log("ELSE");
      console.log("seamCastDepth: ", this.seamCastDepth);
      console.log("seamDepth: ", this.seamDepth);
      console.log("calcInfo.seamDepth: ", this.calcInfo.seamDepth);
      console.log("calcInfo.seamCastDepth: ", this.calcInfo.seamCastDepth);
    }

    if (this.hermetic[this.curDkz]["her"].length === 2) {
      this.curHermetic.single = "";
      this.curHermetic.one = this.hermetic[this.curDkz]["her"][0];
      this.curHermetic.two = this.hermetic[this.curDkz]["her"][1];
      // curContainer.seam.inputs[1]['dkz'] = dkz;
    } else {
      this.curHermetic.one = "";
      this.curHermetic.two = "";
      this.curHermetic.single = this.hermetic[this.curDkz]["her"][0];
    }

    // this.calcInfo = {
    //   den: this.hermetic[this.curDkz].den[this.indexOfCurHer],
    //   seamLength: Number(this.seamLength),
    //   seamWidth: Number(this.seamWidth),
    //   seamDepth: Number(this.seamDepth),
    //   seamCastDepth: Number(this.seamCastDepth)
    // };
  }

  onUpdate(): void {
    const newSeam = {
      dkz: this.curDkz, //index
      her: this.indexOfCurHer, //index
      den: this.indexOfCurHer, //index
      seamLength: this.calcInfo.seamLength,
      seamWidth: this.calcInfo.seamWidth,
      seamDepth: this.calcInfo.seamDepth,
      seamCastDepth: this.calcInfo.seamCastDepth
    };

    const curVolume = Calculations.getVolumeOfHer({
      L: this.calcInfo.seamLength,
      B: this.calcInfo.seamWidth,
      H: this.calcInfo.seamCastDepth
    });
    const curP = this.hermetic[this.curDkz].den[this.indexOfCurHer];

    const newSeamResults = {
      seamWD: Calculations.getSeamWidthDimensions(this.calcInfo.seamWidth),
      len: this.calcInfo.seamLength,
      mass: Calculations.getMassOfHer({ V: curVolume, p: curP }),
      gMass: Calculations.getMassOfGround({ L: newSeam.seamLength })
    };
    this.calcService.updSeams(this.curSeamID, newSeam, newSeamResults);
    this.seamList = this.calcService.getSeams().inputs;
    console.log("seamList: ", this.seamList);
    this.onClear();
  }
  onDelete(): void {
    this.calcService.delSeams(this.curSeamID);
    this.seamList = this.calcService.getSeams().inputs;
    this.onClear();
  }
  onClear(): void {
    this.wrongLength = false;
    this.wrongWidth = false;
    this.wrongDepth = false;
    this.wrongCastDepth = false;
    this.wrongOneOfDepth = false;

    this.indexOfCurHer = -1;
    this.curDkz = null;
    this.curSeamID = -1;
    this.seamLength = null;
    this.seamWidth = null;
    this.seamDepth = null;
    this.seamCastDepth = null;
    this.calcInfo = {
      den: -1,
      seamLength: -1,
      seamWidth: -1,
      seamDepth: 0,
      seamCastDepth: -1
    };
    this.curHermetic = {
      single: "",
      one: "",
      two: ""
    };
  }
  chkCreateDisabled(): boolean {
    return this.wrongWidth ||
      this.wrongLength ||
      this.wrongOneOfDepth ||
      this.calcInfo.den < 0 ||
      this.calcInfo.seamLength < 0 ||
      this.calcInfo.seamWidth < 0 ||
      this.calcInfo.seamCastDepth < 0
      ? false
      : true;
  }
  chkBtnDisabled(): boolean {
    return this.wrongWidth ||
      this.wrongLength ||
      this.curSeamID === -1 ||
      this.wrongOneOfDepth ||
      this.calcInfo.den < 0 ||
      this.calcInfo.seamLength < 0 ||
      this.calcInfo.seamWidth < 0 ||
      this.calcInfo.seamCastDepth < 0
      ? false
      : true;
  }
  chkCastDepthDisabled(): boolean {
    return this.calcInfo.seamDepth > 0 ? false : true;
  }
  chkDepthDisabled(): boolean {
    return this.calcInfo.seamDepth < 0 ? false : true;
  }
  // { "dkz": 2, "her": 1, "den": 1, "seamLength": 12, "seamWidth": 23, "seamDepth": 43, "seamCastDepth": 13 }{ "dkz": 0, "her": 0, "den": 0, "seamLength": 11, "seamWidth": 22, "seamDepth": 33, "seamCastDepth": 3 }
}
