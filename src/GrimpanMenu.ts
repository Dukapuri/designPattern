import { ChromeGrimpan, Grimpan, IEGrimpan, SafariGrimpan } from "./Grimpan.js";
import { GrimpanMode } from "./Grimpan.js";
import {
  BackCommand,
  CircleSelectCommand,
  Command,
  EraserSelectCommand,
  PenSelectCommand,
  PipetteSelectCommand,
  RectangleSelectCommand,
} from "./commands/index.js";
import { GrimpanMenuBtn, GrimpanMenuInput } from "./GrimpanMenuBtn.js";

export abstract class GrimpanMenu {
  grimpan: Grimpan;
  dom: HTMLElement;

  protected constructor(grimpan: Grimpan, dom: HTMLElement) {
    this.grimpan = grimpan;
    this.dom = dom;
  }

  abstract initialize(types: BtnType[]): void;
  setActiveBtn(btn: GrimpanMode) {
    document.querySelector(".active")?.classList.remove("active");
    document.querySelector(`#${btn}-btn`)?.classList.add("active");
    this.grimpan.setMode(btn);
  }
  static getInstance(grimpan: Grimpan, dom: HTMLElement) {}
}

export class IEGrimpanMenu extends GrimpanMenu {
  private static instance: IEGrimpanMenu;

  override initialize(types: BtnType[]): void {}

  static override getInstance(
    grimpan: IEGrimpan,
    dom: HTMLElement
  ): IEGrimpanMenu {
    if (!this.instance) {
      this.instance = new IEGrimpanMenu(grimpan, dom);
    }
    return this.instance;
  }
}

export type BtnType =
  | "pen"
  | "circle"
  | "rectangle"
  | "eraser"
  | "back"
  | "forward"
  | "save"
  | "pipette"
  | "color";

export class ChromeGrimpanMenu extends GrimpanMenu {
  private static instance: ChromeGrimpanMenu;

  override initialize(types: BtnType[]): void {
    types.forEach(this.drawButtonByType.bind(this));
    this.setActiveBtn("pen");
  }

  executeCommand(command: Command) {
    // 비활성화 로직 수정 권한에 대한 로직을 넣어도 좋을 것 같음
    // if (비활성화) {
    //   return;
    // }
    command.execute();
  }
  onClickBack() {
    this.executeCommand(new BackCommand(this.grimpan.history)); // { name: 'back' };
  }
  onClickPen() {
    const command = new PenSelectCommand(this.grimpan);
    this.executeCommand(command); // { name: 'pen' };
    this.grimpan.history.stack.push(command);
  }
  onClickEraser() {
    this.executeCommand(new EraserSelectCommand(this.grimpan)); // { name: 'eraser' };
  }
  onClickCircle() {
    this.executeCommand(new CircleSelectCommand(this.grimpan)); // { name: 'circle' };
  }
  onClickRectangle() {
    this.executeCommand(new RectangleSelectCommand(this.grimpan)); // { name: 'rectangle' };
  }
  onClickPipette() {
    this.executeCommand(new PipetteSelectCommand(this.grimpan)); // { name: 'pipette' };
  }

  drawButtonByType(type: BtnType) {
    switch (type) {
      case "back": {
        const btn = new GrimpanMenuBtn.Builder(this, "뒤로", type)
          .setOnClick(this.onClickBack.bind(this))
          .build();
        btn.draw();
        return btn;
      }
      case "forward": {
        const btn = new GrimpanMenuBtn.Builder(this, "앞으로", type)
          .setOnClick(() => {
            // 앞으로가기 작업
          })
          .build();
        btn.draw();
        return btn;
      }
      case "color": {
        const btn = new GrimpanMenuInput.Builder(this, "컬러", type)
          .setOnChange(() => {})
          .build();
        btn.draw();
        return btn;
      }
      case "pipette": {
        const btn = new GrimpanMenuBtn.Builder(this, "스포이드", type)
          .setOnClick(this.onClickPipette.bind(this))
          .build();
        btn.draw();
        return btn;
      }
      case "eraser": {
        const btn = new GrimpanMenuBtn.Builder(this, "지우개", type)
          .setOnClick(this.onClickEraser.bind(this))
          .build();
        btn.draw();
        return btn;
      }
      case "pen": {
        const btn = new GrimpanMenuBtn.Builder(this, "펜", type)
          .setOnClick(this.onClickPen.bind(this))
          .build();
        btn.draw();
        return btn;
      }
      case "circle": {
        const btn = new GrimpanMenuBtn.Builder(this, "원", type)
          .setOnClick(this.onClickCircle.bind(this))
          .build();
        btn.draw();
        return btn;
      }
      case "rectangle": {
        const btn = new GrimpanMenuBtn.Builder(this, "사각형", type)
          .setOnClick(this.onClickRectangle.bind(this))
          .build();
        btn.draw();
        return btn;
      }
      case "save": {
        const btn = new GrimpanMenuBtn.Builder(this, "저장", type)
          .setOnClick(() => {})
          .build();
        btn.draw();
        return btn;
      }
      default:
        throw new Error(`알 수 없는 타입 ${type}`);
    }
  }

  static override getInstance(
    grimpan: ChromeGrimpan,
    dom: HTMLElement
  ): ChromeGrimpanMenu {
    if (!this.instance) {
      this.instance = new ChromeGrimpanMenu(grimpan, dom);
    }
    return this.instance;
  }
}

export class SafariGrimpanMenu extends GrimpanMenu {
  private static instance: SafariGrimpanMenu;

  override initialize(types: BtnType[]): void {}
  static override getInstance(
    grimpan: SafariGrimpan,
    dom: HTMLElement
  ): SafariGrimpanMenu {
    if (!this.instance) {
      this.instance = new SafariGrimpanMenu(grimpan, dom);
    }
    return this.instance;
  }
}
