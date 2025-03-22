import { PenSelectCommand } from "./commands/index.js";
import { ChromeGrimpanFactory } from "./GrimpanFactory.js";
import { ChromeGrimpanHistory, GrimpanHistory } from "./GrimpanHistory.js";
import { ChromeGrimpanMenu, BtnType, GrimpanMenu } from "./GrimpanMenu.js";
import {
  CircleMode,
  EraserMode,
  Mode,
  PenMode,
  PipetteMode,
  RectangleMode,
} from "./modes/index.js";
export interface GrimpanOption {
  menu: BtnType[];
}
export type GrimpanMode = "pen" | "eraser" | "circle" | "rectangle" | "pipette";
export abstract class Grimpan {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  history!: GrimpanHistory;
  menu!: GrimpanMenu;
  mode!: Mode;
  color: string;
  active: boolean;
  saveStrategy!: () => void;

  protected constructor(canvas: HTMLElement | null) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error("canvas 엘리먼트를 입력하세요");
    }
    this.canvas = canvas as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true })!;
    this.color = "#000000";
    this.active = false;
    this.setSaveStrategy("png");
  }

  abstract initialize(option: GrimpanOption): void;

  abstract onMousedown(e: MouseEvent): void;
  abstract onMousemove(e: MouseEvent): void;
  abstract onMouseup(e: MouseEvent): void;

  static getInstance() {}

  setMode(mode: GrimpanMode) {
    switch (mode) {
      case "pen": {
        this.mode = new PenMode(this);
        break;
      }
      case "eraser": {
        this.mode = new EraserMode(this);
        break;
      }
      case "circle": {
        this.mode = new CircleMode(this);
        break;
      }
      case "rectangle": {
        this.mode = new RectangleMode(this);
        break;
      }
      case "pipette": {
        this.mode = new PipetteMode(this);
        break;
      }
    }
  }

  setSaveStrategy(imageType: "png" | "jpg" | "webp") {
    switch (imageType) {
      case "png": {
        this.saveStrategy = () => {
          const a = document.createElement("a");
          a.download = "canvas.png";
          const dataUrl = this.canvas.toDataURL("image/png");
          let url = dataUrl.replace(
            /^data:image\/png/,
            "data:application/octet-stream"
          );
          a.href = url;
          a.click();
          a.remove();
        };
        break;
      }
      case "jpg": {
        this.saveStrategy = () => {
          const a = document.createElement("a");
          a.download = "canvas.jpeg";
          const dataUrl = this.canvas.toDataURL("image/jpeg");
          let url = dataUrl.replace(
            /^data:image\/jpeg/,
            "data:application/octet-stream"
          );
          a.href = url;
          a.click();
          a.remove();
        };
        break;
      }
      case "webp": {
        this.saveStrategy = () => {
          const a = document.createElement("a");
          a.download = "canvas.webp";
          const dataUrl = this.canvas.toDataURL("image/webp");
          let url = dataUrl.replace(
            /^data:image\/webp/,
            "data:application/octet-stream"
          );
          a.href = url;
          a.click();
          a.remove();
        };
        break;
      }
    }
  }
  setColor(color: string) {
    this.color = color;
  }

  changeColor(color: string) {
    this.setColor(color);
    if (this.menu.colorBtn) {
      this.menu.colorBtn.value = color;
    }
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
    this.canvas.addEventListener("mousedown", this.onMousedown.bind(this));
    this.canvas.addEventListener("mousemove", this.onMousemove.bind(this));
    this.canvas.addEventListener("mouseup", this.onMouseup.bind(this));
  }

  override onMousedown(e: MouseEvent) {
    this.mode.onMousedown(e);
  }

  override onMousemove(e: MouseEvent) {
    this.mode.onMousemove(e);
  }

  override onMouseup(e: MouseEvent) {
    this.mode.onMouseup(e);
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

  override onMousedown(e: MouseEvent) {}
  override onMousemove(e: MouseEvent) {}
  override onMouseup(e: MouseEvent) {}

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

  override onMousedown(e: MouseEvent) {}
  override onMousemove(e: MouseEvent) {}
  override onMouseup(e: MouseEvent) {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new SafariGrimpan(document.querySelector("canvas"));
    }
    return this.instance;
  }
}
