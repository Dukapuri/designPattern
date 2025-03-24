import { Command } from "./commands/index.js";
import {
  BlurFilter,
  DefaultFilter,
  GrayscaleFilter,
  InvertFilter,
} from "./filters/index.js";
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
import { SubscriptionManager } from "./Observer.js";
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

  makeSnapshot() {
    const snapshot = {
      color: this.color,
      mode: this.mode,
      data: this.canvas.toDataURL("image/png"),
    };
    return Object.freeze(snapshot); // preventExtensions : 새로운 속성 추가하는 것을 막음 seal : 속성 추가 및 삭제 막음 freeze : 속성 추가, 삭제, 수정 막음
  }

  protected constructor(canvas: HTMLElement | null) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error("canvas 엘리먼트를 입력하세요");
    }
    this.canvas = canvas as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true })!;
    this.color = "#000000";
    this.active = false;
    this.setSaveStrategy("png");
    SubscriptionManager.getInstance().addEvent("saveComplete");
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

  invoke(command: Command) {
    command.execute();
  }

  setSaveStrategy(imageType: "png" | "jpg" | "webp") {
    switch (imageType) {
      case "png": {
        this.saveStrategy = () => {
          let imageData = this.ctx.getImageData(0, 0, 300, 300);
          const offscreenCanvas = new OffscreenCanvas(300, 300);
          const offscreenContext = offscreenCanvas.getContext("2d")!;
          offscreenContext.putImageData(imageData, 0, 0);
          const df = new DefaultFilter();
          let filter = df;
          if (this.menu.saveSetting.blur) {
            const bf = new BlurFilter();
            filter = filter.setNext(bf);
          }
          if (this.menu.saveSetting.grayScale) {
            const gf = new GrayscaleFilter();
            filter = filter.setNext(gf);
          }
          if (this.menu.saveSetting.invert) {
            const ivf = new InvertFilter();
            filter = filter.setNext(ivf);
          }
          df.handle(offscreenCanvas).then(() => {
            const a = document.createElement("a");
            a.download = "canvas.png";
            offscreenCanvas.convertToBlob().then((blob) => {
              const reader = new FileReader();
              reader.addEventListener("load", () => {
                const dataURL = reader.result as string;
                console.log("dataURL", dataURL);
                let url = dataURL.replace(
                  /^data:image\/png/,
                  "data:application/octet-stream"
                );
                a.href = url;
                a.click();
                SubscriptionManager.getInstance().publish("saveComplete");
              });
              reader.readAsDataURL(blob);
            });
          });
        };
        break;
      }
      case "jpg": {
        this.saveStrategy = () => {
          if (this.menu.saveSetting.blur) {
          }
          if (this.menu.saveSetting.grayScale) {
          }
          if (this.menu.saveSetting.invert) {
          }
          const a = document.createElement("a");
          a.download = "canvas.jpg";
          const dataURL = this.canvas.toDataURL("image/jpeg");
          let url = dataURL.replace(
            /^data:image\/jpeg/,
            "data:application/octet-stream"
          );
          a.href = url;
          a.click();
        };
        break;
      }
      case "webp": {
        this.saveStrategy = () => {
          if (this.menu.saveSetting.blur) {
          }
          if (this.menu.saveSetting.grayScale) {
          }
          if (this.menu.saveSetting.invert) {
          }
          const a = document.createElement("a");
          a.download = "canvas.webp";
          const dataURL = this.canvas.toDataURL("image/webp");
          let url = dataURL.replace(
            /^data:image\/webp/,
            "data:application/octet-stream"
          );
          a.href = url;
          a.click();
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

  resetState() {
    this.color = "#fff";
    this.mode = new PenMode(this);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  restore({
    color,
    mode,
    data,
  }: {
    color: string;
    mode: string;
    data: string;
  }) {
    const image = new Image();
    image.src = data;
    image.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    };
    this.setColor(color);
    this.setMode(mode as GrimpanMode);
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
