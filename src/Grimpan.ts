import { BackCommand, ForwardCommand } from "./commands/index.js";
import { ChromeGrimpanFactory } from "./GrimpanFactory.js";
import { ChromeGrimpanHistory, GrimpanHistory } from "./GrimpanHistory.js";
import { ChromeGrimpanMenu, BtnType, GrimpanMenu } from "./GrimpanMenu.js";

export interface GrimpanOption {
  menu: BtnType[];
}
export type GrimpanMode = "pen" | "eraser" | "circle" | "rectangle" | "pipette";
export abstract class Grimpan {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  history!: GrimpanHistory;
  menu!: GrimpanMenu;
  mode!: GrimpanMode;

  protected constructor(canvas: HTMLElement | null) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error("canvas 엘리먼트를 입력하세요");
    }
    this.canvas = canvas as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;
  }

  abstract initialize(option: GrimpanOption): void;

  static getInstance() {}

  setMode(mode: GrimpanMode) {
    console.log(mode);
    this.mode = mode;
  }
}

export class ChromeGrimpan extends Grimpan {
  private static instance: ChromeGrimpan;
  override menu: ChromeGrimpanMenu;
  override history: ChromeGrimpanHistory;

  private constructor(
    canvas: HTMLElement | null,
    factory: typeof ChromeGrimpanFactory
  ) {
    super(canvas);
    this.menu = factory.createGrimpanMenu(
      this,
      document.querySelector("#menu")!
    );
    this.history = factory.createGrimpanHistory(this);
  }

  initialize(option: GrimpanOption) {
    this.menu.initialize(option.menu);
    this.history.initialize();
    window.addEventListener("keyup", (e) => {
      if (e.key === "KeyZ" && e.ctrlKey && e.shiftKey) {
        this.menu.executeCommand(new ForwardCommand(this.history));
        return;
      }

      if (e.key === "KeyZ" && e.ctrlKey) {
        this.menu.executeCommand(new BackCommand(this.history));
        return;
      }
    });
  }

  static override getInstance() {
    if (!this.instance) {
      this.instance = new ChromeGrimpan(
        document.querySelector("canvas"),
        ChromeGrimpanFactory
      );
    }
    return this.instance;
  }
}

export class IEGrimpan extends Grimpan {
  private static instance: IEGrimpan;

  initialize() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new IEGrimpan(document.querySelector("canvas"));
    }
    return this.instance;
  }
}

export class SafariGrimpan extends Grimpan {
  private static instance: SafariGrimpan;

  initialize() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new SafariGrimpan(document.querySelector("canvas"));
    }
    return this.instance;
  }
}
