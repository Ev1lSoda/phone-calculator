import { Component, OnInit } from "@angular/core";
import { ScrollView, ScrollEventData } from "@nativescript/core";

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
  public showEditButton = false;

  public wrongLength = false;
  public wrongWidth = false;
  public wrongDepth = false;
  public wrongCastDepth = false;

  public indexOfCurHer = -1;
  public curDkz: any;
  public curSeamID = -1;
  public seamLength: any;
  public seamWidth: any;
  public seamDepth: any;
  public seamCastDepth: any;

  constructor(private calcService: CalcStateService) {}

  ngOnInit(): void {
    console.log("curCONTlen: ", this.calcService.getSeams().inputs.length);
    this.curSeamID = this.calcService.getSeams().inputs.length + 1;
    this.seamList = this.calcService.getSeams().inputs;
    this.showEditButton = false;
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
  onScroll(args: ScrollEventData) {
    const scrollView = args.object as ScrollView;
  }

  getDen(denIndex: number): void {
    this.indexOfCurHer = denIndex;
    this.calcInfo.den = this.hermetic[this.curDkz].den[denIndex];
    console.log(".calcInfo.den: ", this.calcInfo.den);
  }

  getInputLength(): void {
    this.calcInfo.seamLength = this.seamLength;
    if (this.seamLength < 1 || this.seamLength > 10000) {
      this.wrongLength = true;
    } else {
      this.wrongLength = false;
    }
  }

  getInputWidth(): void {
    this.calcInfo.seamCastDepth = -1;
    this.seamCastDepth = null;
    this.seamDepth = null;
    this.calcInfo.seamWidth = this.seamWidth;
    console.log("seamWidth: ", this.seamWidth);
    console.log(
      "Calculations: ",
      Calculations.getSeamWidthDimensions(this.seamWidth)
    );
    if (this.seamWidth < 5 || this.seamWidth > 38) {
      this.wrongWidth = true;
    } else {
      this.wrongWidth = false;
    }
    const seamWidthDemension = Calculations.getSeamWidthDimensions(
      this.calcInfo.seamWidth
    );
    if (this.seamDepth <= seamWidthDemension) {
      this.wrongDepth = true;
    } else {
      this.wrongDepth = false;
    }
  }

  getInputDepth(): void {
    const seamWidthDemension = Calculations.getSeamWidthDimensions(
      this.calcInfo.seamWidth
    );
    if (this.seamDepth <= seamWidthDemension) {
      this.wrongDepth = true;
    } else {
      this.wrongDepth = false;
    }
    this.calcInfo.seamCastDepth = this.seamDepth - seamWidthDemension;
    this.seamCastDepth = this.calcInfo.seamCastDepth;
    if (this.seamCastDepth < 1 || this.seamCastDepth > 1000) {
      this.wrongCastDepth = true;
    } else {
      this.wrongCastDepth = false;
    }
  }

  getInputCastDepth(): void {
    console.log("seamCastDepth: ", this.seamCastDepth);
    this.calcInfo.seamCastDepth = this.seamCastDepth;
    if (this.seamCastDepth < 1 || this.seamCastDepth > 1000) {
      this.wrongCastDepth = true;
    } else {
      this.wrongCastDepth = false;
    }

    const seamWidthDemension = Calculations.getSeamWidthDimensions(
      this.calcInfo.seamWidth
    );
    this.seamDepth = this.seamCastDepth + seamWidthDemension;
    if (this.seamDepth <= seamWidthDemension) {
      this.wrongDepth = true;
    } else {
      this.wrongDepth = false;
    }
  }

  onSaveSeam(): void {
    this.showEditButton = false;
    const newSeam = {
      dkz: this.curDkz, //index
      her: this.indexOfCurHer, //index
      den: this.indexOfCurHer, //index
      seamLength: this.seamLength,
      seamWidth: this.seamWidth,
      seamDepth: this.seamDepth,
      seamCastDepth: this.seamCastDepth
    };

    const curVolume = Calculations.getVolumeOfHer({
      L: this.seamLength,
      B: this.seamWidth,
      H: this.seamCastDepth
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
  }

  getSelectedSeam(seamID: number): void {
    this.showEditButton = true;
    console.log("seamList[seamID]: ", this.seamList[seamID]);

    this.wrongLength = false;
    this.wrongWidth = false;
    this.wrongDepth = false;
    this.wrongCastDepth = false;

    this.indexOfCurHer = this.seamList[seamID]["her"];
    this.curDkz = this.seamList[seamID]["dkz"];
    this.curSeamID = seamID;
    this.seamLength = this.seamList[seamID]["seamLength"];
    this.seamWidth = this.seamList[seamID]["seamWidth"];
    this.seamDepth = this.seamList[seamID]["seamDepth"];
    this.seamCastDepth = this.seamList[seamID]["seamCastDepth"];

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

    this.calcInfo = {
      den: this.hermetic[this.curDkz].den[this.indexOfCurHer],
      seamLength: this.seamLength,
      seamWidth: this.seamWidth,
      seamCastDepth: this.seamCastDepth
    };
  }

  onUpdate(): void {
    this.showEditButton = false;
    const newSeam = {
      dkz: this.curDkz, //index
      her: this.indexOfCurHer, //index
      den: this.indexOfCurHer, //index
      seamLength: this.seamLength,
      seamWidth: this.seamWidth,
      seamDepth: this.seamDepth,
      seamCastDepth: this.seamCastDepth
    };

    const curVolume = Calculations.getVolumeOfHer({
      L: this.seamLength,
      B: this.seamWidth,
      H: this.seamCastDepth
    });
    const curP = this.hermetic[this.curDkz].den[this.indexOfCurHer];

    const newSeamResults = {
      seamWD: Calculations.getSeamWidthDimensions(this.seamWidth),
      len: this.calcInfo.seamLength,
      mass: Calculations.getMassOfHer({ V: curVolume, p: curP }),
      gMass: Calculations.getMassOfGround({ L: newSeam.seamLength })
    };
    this.calcService.updSeams(this.curSeamID, newSeam, newSeamResults);
    this.seamList = this.calcService.getSeams().inputs;
    console.log("seamList: ", this.seamList);
    this.onClear();
    this.showEditButton = false;
    this.curHermetic = {
      single: "",
      one: "",
      two: ""
    };
  }
  onDelete(): void {
    this.calcService.delSeams(this.curSeamID);
    this.seamList = this.calcService.getSeams().inputs;
    this.onClear();
    this.showEditButton = false;
  }
  onClear(): void {
    this.wrongLength = false;
    this.wrongWidth = false;
    this.wrongDepth = false;
    this.wrongCastDepth = false;

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
      seamCastDepth: -1
    };
  }
  chkBtnDisabled(): boolean {
    return this.wrongWidth ||
      this.wrongLength ||
      this.wrongCastDepth ||
      this.calcInfo.den < 0 ||
      this.calcInfo.seamLength < 0 ||
      this.calcInfo.seamWidth < 0 ||
      this.calcInfo.seamCastDepth < 0
      ? true
      : false;
  }

  // { "dkz": 2, "her": 1, "den": 1, "seamLength": 12, "seamWidth": 23, "seamDepth": 43, "seamCastDepth": 13 }{ "dkz": 0, "her": 0, "den": 0, "seamLength": 11, "seamWidth": 22, "seamDepth": 33, "seamCastDepth": 3 }
}
