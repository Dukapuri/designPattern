import Grimpan from "./AbstractGrimpan.js";
import ChromeGrimpan from "./ChromeGrimpan.js";
import IEGrimpan from "./IEGrimpan.js";
import SafariGrimpan from "./SafariGrimpan.js";

export abstract class GrimpanHistory {
  grimpan: Grimpan;
  protected constructor(grimpan: Grimpan) {
    this.grimpan = grimpan;
  }

  abstract initialize(): void;
  static getInstance(grimpan: Grimpan) {}
}

export class IEGrimpanHistory extends GrimpanHistory {
  private static instance: IEGrimpanHistory;

  override initialize(): void {}

  static override getInstance(grimpan: IEGrimpan): IEGrimpanHistory {
    if (!this.instance) {
      this.instance = new IEGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}

export class ChromeGrimpanHistory extends GrimpanHistory {
  private static instance: ChromeGrimpanHistory;

  override initialize(): void {}

  static override getInstance(grimpan: ChromeGrimpan): ChromeGrimpanHistory {
    if (!this.instance) {
      this.instance = new ChromeGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}

export class SafariGrimpanHistory extends GrimpanHistory {
  private static instance: SafariGrimpanHistory;

  override initialize(): void {}

  static override getInstance(grimpan: SafariGrimpan): SafariGrimpanHistory {
    if (!this.instance) {
      this.instance = new SafariGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}
