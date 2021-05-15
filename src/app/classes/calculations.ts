export class Calculations {
  static getSeamWidthDimensions(camera: number): number {
    if (camera >= 5 && camera <= 8) {
      return 10;
    } else if (camera >= 9 && camera <= 10) {
      return 13;
    } else if (camera >= 11 && camera <= 12) {
      return 15;
    } else if (camera >= 13 && camera <= 15) {
      return 20;
    } else if (camera >= 16 && camera <= 18) {
      return 22;
    } else if (camera >= 19 && camera <= 20) {
      return 25;
    } else if (camera >= 21 && camera <= 28) {
      return 30;
    } else if (camera >= 29 && camera <= 38) {
      return 38;
    } else {
      return 0;
    }
  }
  //объем камеры герметизации [см3]
  static getVolumeOfHer(inputData: any): number {
    return inputData.L * 100 * (inputData.B / 10) * (inputData.H / 10);
  }

  static getMassOfHer(inputData: any): number {
    return (inputData.V * inputData.p) / 1000;
  }

  static getMassOfGround(inputData: any): number {
    return (inputData.L * 65) / 1000;
  }
  //объем камеры герметизации [м3]
  static getVolumeForStone(inputData: any): number {
    return inputData.L * (inputData.B / 1000) * (inputData.H / 1000);
  }
  // mщ10-20 – масса щебня фр.10-20
  static calcGravelMass(grvlVolume: number): number {
    return grvlVolume * 1380;
  }
  // Vм – объем мастики, занимающей свободное межзерновое пространство
  static calcSpaceMast(grvlMass: number): number {
    return (grvlMass / 100) * 47;
  }
  // mм1 – масса мастики по пустотности щебня
  static calcVacMassMast(inputData: any): number {
    return inputData["V"] * inputData["p"];
  }
  // Sобщ – общая площадь обрабатываемых поверхностей шва
  static calcSeamTotalArea(inputData: any): number {
    return (
      inputData["L"] * (inputData["B"] / 1000) +
      2 * (inputData["L"] * (inputData["H"] / 1000))
    );
  }
  //mгр – масса грунтовки
  static calcGruntMass(totalArea: number): number {
    return 0.25 * totalArea;
  }
  //Расход mщ5-10 = 18 кг/пог.м.
  static calcMSh510(len: number): number {
    return 18 * len;
  }
  //Расход mщ3-5 = 25 кг/м2
  static calcMSh35(inputData: any): number {
    return 25 * inputData["L"] * (inputData["B"] / 1000);
  }
  //mмобмаз – мастика на подгрунтовку
  static calcMSMTotal(S: number): number {
    return 3 * S;
  }
  //mмобр.щ10-20 – мастика на обработку щебня
  static calcMmSha1020(m: number): number {
    return m / 100;
  }
  //mмпрол.щ10-20 – мастика на проливку щебня
  static calcMmPropSha1020(m: number): number {
    return (m / 100) * 27;
  }
  //mмобр.щ5-10 – мастика на обработку щебня
  static calcMmSha510(m: number): number {
    return (m / 100) * 2;
  }
  //mмобр.щ3-5 – мастика на обработку щебня
  static calcMmSha35(m: number): number {
    return m / 100;
  }
  //mм2 – общая масса мастики
  static calcMm2(inputData: number[]): number {
    return (
      inputData[0] + inputData[1] + inputData[2] + inputData[3] + inputData[4]
    );
  }
  //mмср – среднее значение по двум произведенным расчетам
  static calcMmCp(inputData: number[]): number {
    return (inputData[0] + inputData[1]) / 2;
  }
}
