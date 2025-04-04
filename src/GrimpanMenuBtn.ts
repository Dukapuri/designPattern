import { BtnType, GrimpanMenu } from "./GrimpanMenu.js";
import { MenuDrawVisitor } from "./MenuDrawVisitor.js";

abstract class GrimpanMenuElementBuilder {
  btn!: GrimpanMenuElement;
  constructor() {}

  build() {
    return this.btn;
  }
}

abstract class GrimpanMenuElement {
  public menu: GrimpanMenu;
  public name: string;
  public type: BtnType;
  protected constructor(menu: GrimpanMenu, name: string, type: BtnType) {
    this.menu = menu;
    this.name = name;
    this.type = type;
  }

  abstract draw(visitor: MenuDrawVisitor): HTMLElement;
}

export class GrimpanMenuInput extends GrimpanMenuElement {
  public onChange?: (e: Event) => void;
  public value?: string | number;

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

    override build(): GrimpanMenuInput {
      return this.btn;
    }
  };

  override draw(visitor: MenuDrawVisitor): HTMLInputElement {
    return visitor.drawInput(this);
  }
}

export class GrimpanMenuBtn extends GrimpanMenuElement {
  public onClick?: () => void;
  public active?: boolean;

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

  override draw(visitor: MenuDrawVisitor): HTMLButtonElement {
    return visitor.drawBtn(this);
  }

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

    override build(): GrimpanMenuBtn {
      return this.btn;
    }
  };
}

export class GrimpanMenuSaveBtn extends GrimpanMenuBtn {
  public onClickBlur!: (e: Event) => void;
  public onClickInvert!: (e: Event) => void;
  public onClickGrayScale!: (e: Event) => void;

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

    override build(): GrimpanMenuSaveBtn {
      return this.btn;
    }
  };

  override draw(visitor: MenuDrawVisitor): HTMLButtonElement {
    return visitor.drawSaveBtn(this);
  }
}
