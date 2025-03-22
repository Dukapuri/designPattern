import { BtnType, GrimpanMenu } from "./GrimpanMenu.js";

abstract class GrimpanMenuElementBuilder {
  btn!: GrimpanMenuElement;
  constructor() {}

  build() {
    return this.btn;
  }
}

abstract class GrimpanMenuElement {
  protected menu: GrimpanMenu;
  protected name: string;
  protected type: BtnType;
  protected constructor(menu: GrimpanMenu, name: string, type: BtnType) {
    this.menu = menu;
    this.name = name;
    this.type = type;
  }

  draw(): void {
    const btn = this.createButton();
    this.appendBeforeBtn();
    this.appendToDom(btn);
    this.appendAfterBtn();
  }

  abstract createButton(): HTMLElement;
  abstract appendBeforeBtn(): void;
  abstract appendToDom(btn: HTMLElement): void;
  abstract appendAfterBtn(): void;
}

export class GrimpanMenuInput extends GrimpanMenuElement {
  private onChange?: (e: Event) => void;
  private value?: string | number;

  private constructor(
    menu: GrimpanMenu,
    name: string,
    type: BtnType,
    onChange?: () => void,
    value?: string | number
  ) {
    super(menu, name, type);
    this.onChange = onChange;
    this.value = value;
  }

  override appendToDom(btn: HTMLInputElement): void {
    this.menu.colorBtn = btn;
    this.menu.dom.append(btn);
  }

  override appendBeforeBtn(): void {}
  override appendAfterBtn(): void {}

  override createButton(): HTMLElement {
    const btn = document.createElement("input");
    btn.type = "color";
    btn.title = this.name;
    btn.id = "color-btn";
    if (this.onChange) {
      btn.addEventListener("change", this.onChange.bind(this));
    }
    return btn;
  }

  static Builder = class GrimpanMenuInputBuilder extends GrimpanMenuElementBuilder {
    override btn: GrimpanMenuInput;
    constructor(menu: GrimpanMenu, name: string, type: BtnType) {
      super();
      this.btn = new GrimpanMenuInput(menu, name, type);
    }

    setOnChange(onChange: (e: Event) => void) {
      this.btn.onChange = onChange;
      return this;
    }

    setValue(value: string | number) {
      this.btn.value = value;
      return this;
    }
  };
}

export class GrimpanMenuBtn extends GrimpanMenuElement {
  protected onClick?: () => void;
  protected active?: boolean;

  protected constructor(
    menu: GrimpanMenu,
    name: string,
    type: BtnType,
    onClick?: () => void,
    active?: boolean
  ) {
    super(menu, name, type);
    this.active = active;
    this.onClick = onClick;
  }

  createButton(): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.textContent = this.name;
    btn.id = `${this.type}-btn`;
    if (this.onClick) {
      btn.addEventListener("click", this.onClick.bind(this));
    }
    return btn;
  }

  appendBeforeBtn() {}

  appendToDom(btn: HTMLButtonElement) {
    this.menu.dom.append(btn);
  }

  appendAfterBtn() {}

  static Builder = class GrimpanMenuBtnBuilder extends GrimpanMenuElementBuilder {
    override btn: GrimpanMenuBtn;
    constructor(menu: GrimpanMenu, name: string, type: BtnType) {
      super();
      this.btn = new GrimpanMenuBtn(menu, name, type);
    }

    setOnClick(onClick: () => void) {
      this.btn.onClick = onClick;
      return this;
    }

    setActive(active: boolean) {
      this.btn.active = active;
      return this;
    }
  };
}

export class GrimpanMenuSaveBtn extends GrimpanMenuBtn {
  private onClickBlur!: (e: Event) => void;
  private onClickInvert!: (e: Event) => void;
  private onClickGrayScale!: (e: Event) => void;

  private constructor(
    menu: GrimpanMenu,
    name: string,
    type: BtnType,
    onClick?: () => void,
    active?: boolean
  ) {
    super(menu, name, type);
    this.active = active;
    this.onClick = onClick;
  }

  static override Builder = class GrimpanMenuSaveBtnBuilder extends GrimpanMenuElementBuilder {
    override btn: GrimpanMenuSaveBtn;
    constructor(menu: GrimpanMenu, name: string, type: BtnType) {
      super();
      this.btn = new GrimpanMenuSaveBtn(menu, name, type);
    }

    setOnClick(onClick: () => void) {
      this.btn.onClick = onClick;
      return this;
    }

    setActive(active: boolean) {
      this.btn.active = active;
      return this;
    }

    setFilterListeners(listeners: {
      [key in "blur" | "invert" | "grayScale"]: (e: Event) => void;
    }) {
      this.btn.onClickBlur = listeners.blur;
      this.btn.onClickInvert = listeners.invert;
      this.btn.onClickGrayScale = listeners.grayScale;
      return this;
    }
  };

  override appendBeforeBtn(): void {
    this.drawInput("블러", this.onClickBlur);
    this.drawInput("반전", this.onClickInvert);
    this.drawInput("흑백", this.onClickGrayScale);
  }

  drawInput(title: string, onChange: (e: Event) => void) {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.title = title;
    input.addEventListener("change", onChange.bind(this));
    this.menu.dom.append(input);
  }
}
