import { ChromeGrimpan, Grimpan, IEGrimpan, SafariGrimpan } from "./Grimpan.js";
import { SubscriptionManager } from "./Observer.js";

class StackIterator {
  private index = 0;
  constructor(private readonly stack: HistoryStack) {}

  next() {
    if (!this.done) {
      return this.stack[this.index++];
    }
  }

  get done() {
    return this.stack.length === this.index;
  }
}

interface Cloneable {
  clone(): Cloneable;
}

class HistoryStack extends Array implements Cloneable {
  clone() {
    return this.slice() as HistoryStack;
  }

  override slice(start?: number, end?: number): HistoryStack {
    return super.slice(start, end) as HistoryStack;
  }
}

new StackIterator(new HistoryStack());

export abstract class GrimpanHistory {
  grimpan: Grimpan;
  stack: HistoryStack;
  index = -1;

  protected constructor(grimpan: Grimpan) {
    this.grimpan = grimpan;
    this.stack = new HistoryStack();
    SubscriptionManager.getInstance().subscribe("saveComplete", {
      name: "history",
      publish: this.afterSaveComplete.bind(this),
    });
  }

  initialize() {
    (document.querySelector("#back-btn") as HTMLButtonElement).disabled = true;
    (document.querySelector("#forward-btn") as HTMLButtonElement).disabled =
      true;
  }

  saveHistory() {
    const snapshot = this.grimpan.makeSnapshot();
    if (this.index === this.stack.length - 1) {
      this.stack.push(snapshot);
      this.index++;
    } else {
      // 뒤로가기를 몇 번 누른 상황
      this.stack = this.stack.slice(0, this.index + 1);
      this.stack.push(snapshot);
      this.index++;
    }
    (document.querySelector("#back-btn")! as HTMLButtonElement).disabled =
      false;
    (document.querySelector("#forward-btn")! as HTMLButtonElement).disabled =
      true;
    console.log("save", this.index, this.stack);
  }

  undo() {
    console.log("undo", this.index, this.stack);
    if (this.undoable()) {
      // [0]
      this.index--;
      (document.querySelector("#forward-btn") as HTMLButtonElement).disabled =
        false;
    } else {
      return;
    }
    if (!this.undoable()) {
      (document.querySelector("#back-btn") as HTMLButtonElement).disabled =
        true;
    }
    this.grimpan.restore(this.stack[this.index]);
  }
  redo() {
    console.log("redo", this.index, this.stack);
    if (this.redoable()) {
      this.index++;
      (document.querySelector("#back-btn") as HTMLButtonElement).disabled =
        false;
    } else {
      return;
    }
    if (!this.redoable()) {
      (document.querySelector("#forward-btn") as HTMLButtonElement).disabled =
        true;
    }
    this.grimpan.restore(this.stack[this.index]);
  }

  getStack() {
    return this.stack.clone();
  }

  setStack(stack: HistoryStack) {
    this.stack = stack.clone();
  }

  afterSaveComplete() {
    console.log("afterSaveComplete This is GrimpanHistory");
  }

  cancleSaveCompleteAlarm() {
    SubscriptionManager.getInstance().unsubscribe("saveComplete", "history");
  }

  static getInstance(grimpan: Grimpan) {}

  undoable() {
    return this.index > 0;
  }

  redoable() {
    return this.index < this.stack.length - 1;
  }
}

export class IEGrimpanHistory extends GrimpanHistory {
  private static instance: IEGrimpanHistory;

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

  static override getInstance(grimpan: ChromeGrimpan): ChromeGrimpanHistory {
    if (!this.instance) {
      this.instance = new ChromeGrimpanHistory(grimpan);
    }
    return this.instance;
  }
}

export class SafariGrimpanHistory extends GrimpanHistory {
  private static instance: SafariGrimpanHistory;

  static override getInstance(grimpan: SafariGrimpan): SafariGrimpanHistory {
    if (!this.instance) {
      this.instance = new SafariGrimpanHistory(grimpan);
    }
    return this.instance;
  }
  override undo(): void {}
  override redo(): void {}
}
