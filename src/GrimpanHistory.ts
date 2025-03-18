import { ChromeGrimpan, Grimpan, IEGrimpan, SafariGrimpan } from "./Grimpan.js";

interface Cloneable {
  clone(): Cloneable;
}

class HistoryStack extends Array implements Cloneable {
  clone() {
    return this.slice() as HistoryStack;
  }
}

export abstract class GrimpanHistory {
  grimpan: Grimpan;
  stack: HistoryStack;

  protected constructor(grimpan: Grimpan) {
    this.grimpan = grimpan;
    this.stack = new HistoryStack();
  }

  abstract undo(): void;
  abstract redo(): void;

  getStack() {
    return this.stack.clone();
  }

  setStack(stack: HistoryStack) {
    this.stack = stack.clone();
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
  override undo(): void {}
  override redo(): void {}
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
  override undo(): void {}
  override redo(): void {}
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
  override undo(): void {}
  override redo(): void {}
}
