import { Component, OnInit } from "@angular/core";
import { TextField } from "@nativescript/core";

import { CalcStateService } from "../service/calc-state.service";
import { Calculations } from "../classes/calculations";

@Component({
  selector: "NgRu-stone",
  templateUrl: "./stone.component.html",
  styleUrls: ["./stone.component.css"]
})
export class StoneComponent implements OnInit {
  private stonResults = {
    Msh1020: -1,
    Msh510: -1,
    Msh35: -1,
    Mgr: -1,
    MmCP: -1
  };
  private dkzList = [
    {
      dkz: 2,
      mast: "ДШ-85",
      dnst: 1.2
    },
    {
      dkz: 3,
      mast: "ДШ-85",
      dnst: 1.2
    },
    {
      dkz: 4,
      mast: "ДШ-90",
      dnst: 1.2
    },
    {
      dkz: 5,
      mast: "ДШ-90",
      dnst: 1.2
    }
  ];
  public seamList = []; // list of seams defined: button list

  public calcInfo = {
    dnst: 1.2,
    seamLength: -1,
    seamWidth: -1,
    seamDepth: -1
  };

  public wrongLength = false;
  public wrongWidth = false;
  public wrongDepth = false;

  public curDkz: any;
  public curDnst: any;
  public seamLength: any;
  public seamWidth: any;
  public seamDepth: any;
  public curSeamID = -1;

  constructor(private calcService: CalcStateService) {}

  ngOnInit(): void {
    console.log("curCONTlen: ", this.calcService.getStones().inputs.length);
    this.seamList = this.calcService.getStones().inputs;
  }

  pickMast(selMastId: number): void {
    this.curDkz = selMastId;
  }

  onSaveStoneSeam(): void {
    const newStone = {
      dkz: this.curDkz,
      dnst: this.calcInfo.dnst,
      seamLength: this.calcInfo.seamLength,
      seamWidth: this.calcInfo.seamWidth,
      seamDepth: this.calcInfo.seamDepth
    };
    this.calcResultsForStone();
    const newSResults = this.stonResults;

    this.calcService.saveStones(newStone, newSResults);
    this.seamList = this.calcService.getStones().inputs;
    console.log("seamList: ", this.seamList);
    this.onClear();
  }

  getInputLength(args): void {
    let textField = <TextField>args.object;
    if (textField.text != "" && textField.text != null) {
      this.seamLength = textField.text;
      this.calcInfo.seamLength = Number(this.seamLength);
      if (this.seamLength < 1 || this.seamLength > 10000) {
        this.wrongLength = true;
      } else {
        this.wrongLength = false;
      }
    } else {
      this.calcInfo.seamLength = -1;
    }
    console.log("seamLength: ", this.calcInfo.seamLength);
  }

  getInputWidth(args): void {
    let textField = <TextField>args.object;
    if (textField.text != "" && textField.text != null) {
      this.seamWidth = textField.text;
      this.calcInfo.seamWidth = Number(this.seamWidth);
      if (this.seamWidth < 1 || this.seamWidth > 10000) {
        this.wrongWidth = true;
      } else {
        this.wrongWidth = false;
      }
    } else {
      this.calcInfo.seamWidth = -1;
    }
  }
  //
  getInputDepth(args): void {
    let textField = <TextField>args.object;
    if (textField.text != "" && textField.text != null) {
      this.seamDepth = textField.text;
      this.calcInfo.seamDepth = Number(this.seamDepth);
      if (this.seamDepth < 1 || this.seamDepth > 10000) {
        this.wrongDepth = true;
      } else {
        this.wrongDepth = false;
      }
    } else {
      this.calcInfo.seamDepth = -1;
    }
  }
  chkCreateDisabled(): boolean {
    return this.wrongWidth ||
      this.wrongLength ||
      this.calcInfo.seamLength < 0 ||
      this.calcInfo.seamWidth < 0 ||
      this.calcInfo.seamDepth < 0
      ? false
      : true;
  }
  warnUser(text: string) {
    alert(text);
  }

  chkBtnDisabled(): boolean {
    return this.wrongWidth ||
      this.wrongLength ||
      this.curSeamID === -1 ||
      this.calcInfo.seamLength < 0 ||
      this.calcInfo.seamWidth < 0 ||
      this.calcInfo.seamDepth < 0
      ? false
      : true;
  }
  getSelectedStone(seamID: number): void {
    console.log("seamList[seamID]: ", this.seamList[seamID]);

    this.wrongLength = false;
    this.wrongWidth = false;
    this.wrongDepth = false;

    this.curDkz = this.seamList[seamID]["dkz"];
    this.curSeamID = seamID;
    this.seamLength = this.seamList[seamID]["seamLength"];
    this.seamWidth = this.seamList[seamID]["seamWidth"];
    this.seamDepth = this.seamList[seamID]["seamDepth"];
    this.curDnst = this.seamList[seamID]["curDnst"];

    this.calcInfo = {
      dnst: 1.2,
      seamLength: this.seamLength,
      seamWidth: this.seamWidth,
      seamDepth: this.seamDepth
    };
  }
  onUpdate(): void {
    const newStone = {
      dkz: this.curDkz,
      dnst: 1.2,
      seamLength: this.calcInfo.seamLength,
      seamWidth: this.calcInfo.seamWidth,
      seamDepth: this.calcInfo.seamDepth
    };
    this.calcResultsForStone();
    const newSResults = this.stonResults;
    this.calcService.updStones(this.curSeamID, newStone, newSResults);
    this.seamList = this.calcService.getStones().inputs;
    console.log("seamList: ", this.seamList);
    this.onClear();
  }
  onDelete(): void {
    this.calcService.delStones(this.curSeamID);
    this.seamList = this.calcService.getStones().inputs;
    this.onClear();
  }
  onClear(): void {
    this.wrongLength = false;
    this.wrongWidth = false;
    this.wrongDepth = false;

    this.curDkz = null;
    this.curDnst = -1;
    this.curSeamID = -1;
    this.seamLength = null;
    this.seamWidth = null;
    this.seamDepth = null;
    this.calcInfo = {
      dnst: 1.2,
      seamLength: -1,
      seamWidth: -1,
      seamDepth: -1
    };
    this.stonResults = {
      Msh1020: -1,
      Msh510: -1,
      Msh35: -1,
      Mgr: -1,
      MmCP: -1
    };
  }
  calcResultsForStone(): void {
    const LBH = {
      L: this.calcInfo.seamLength,
      B: this.calcInfo.seamWidth,
      H: this.calcInfo.seamDepth
    };
    const Vsh = Calculations.getVolumeForStone(LBH);
    const Msh1020 = Calculations.calcGravelMass(Vsh);
    const Vm = Calculations.calcSpaceMast(Vsh);
    const Mm1 = Calculations.calcVacMassMast({ V: Vm, p: this.calcInfo.dnst });
    const Sobsh = Calculations.calcSeamTotalArea(LBH);
    const Mgr = Calculations.calcGruntMass(Sobsh);
    const Msh510 = Calculations.calcMSh510(this.calcInfo.seamLength);
    const Msh35 = Calculations.calcMSh35({
      L: this.calcInfo.seamLength,
      B: this.calcInfo.seamWidth
    });
    const MSMTotal = Calculations.calcMSMTotal(Sobsh);
    const MmSha1020 = Calculations.calcMmSha1020(Msh1020);
    const MmPropSha1020 = Calculations.calcMmPropSha1020(Msh1020);
    const MmSha510 = Calculations.calcMmSha510(Msh510);
    const MmSha35 = Calculations.calcMmSha35(Msh35);
    const Mm2 = Calculations.calcMm2([
      MSMTotal,
      MmSha1020,
      MmPropSha1020,
      MmSha510,
      MmSha35
    ]);
    const MmCp = Calculations.calcMmCp([Mm1, Mm2]);
    // console.log("this.calcInfo.dnst: ", this.calcInfo.dnst);
    // console.log("Vsh: ", Vsh);
    // console.log("Msh1020: ", Msh1020);
    // console.log("Vm: ", Vm);
    // console.log("Mm1: ", Mm1);
    // console.log("Sobsh: ", Sobsh);
    // console.log("Mgr: ", Mgr);
    // console.log("Msh510: ", Msh510);
    // console.log("Msh35: ", Msh35);
    // console.log("MSMTotal: ", MSMTotal);
    // console.log("MmSha1020: ", MmSha1020);
    // console.log("MmPropSha1020: ", MmPropSha1020);
    // console.log("MmSha510: ", MmSha510);
    // console.log("MmSha35: ", MmSha35);
    // console.log("Mm2: ", Mm2);
    // console.log("MmCp: ", MmCp);
    this.stonResults = {
      Msh1020: Msh1020,
      Msh510: Msh510,
      Msh35: Msh35,
      Mgr: Mgr,
      MmCP: MmCp
    };
  }
}
