class GrimpanMenuBtn {
  name?: string;
  type?: string;
  onClick?: () => void;
  onChange?: () => void;
  active?: boolean;
  value?: string | number;

  constructor() {}

  static Builder = class GrimpanMenuBtnBuilder {};
}

interface GrimpanMenuBtnBuilder {
  setName(name: string): this;
  setType(type: string): this;
  setOnClick(onClick: () => void): this;
  setOnChange(onChange: () => void): this;
  setActive(active: boolean): this;
  setValue(value: string | number): this;
  build(): GrimpanMenuBtn;
}

class ChromeGrimpanMenuBtn implements GrimpanMenuBtnBuilder {
  btn: GrimpanMenuBtn;
  constructor() {
    this.btn = new GrimpanMenuBtn();
  }

  setName(name: string) {
    this.btn.name = name;
    return this;
  }
  setType(type: string) {
    this.btn.type = type;
    return this;
  }
  setActive(active: boolean) {
    this.btn.active = active;
    return this;
  }
  setValue(value: string | number) {
    this.btn.value = value;
    return this;
  }
  setOnClick(onClick: () => void) {
    this.btn.onClick = onClick;
    return this;
  }
  setOnChange(onChange: () => void) {
    this.btn.onChange = onChange;
    return this;
  }
  build() {
    return this.btn;
  }
}

class IEGrimpanMenuBtn implements GrimpanMenuBtnBuilder {
  btn: GrimpanMenuBtn;
  constructor() {
    this.btn = new GrimpanMenuBtn();
  }

  setName(name: string) {
    this.btn.name = name;
    return this;
  }
  setType(type: string) {
    this.btn.type = type;
    return this;
  }
  setActive(active: boolean) {
    this.btn.active = active;
    return this;
  }
  setValue(value: string | number) {
    this.btn.value = value;
    return this;
  }
  setOnClick(onClick: () => void) {
    this.btn.onClick = onClick;
    return this;
  }
  setOnChange(onChange: () => void) {
    this.btn.onChange = onChange;
    return this;
  }
  build() {
    return this.btn;
  }
}

class SafariGrimpanMenuBtn implements GrimpanMenuBtnBuilder {
  btn: GrimpanMenuBtn;
  constructor() {
    this.btn = new GrimpanMenuBtn();
  }

  setName(name: string) {
    this.btn.name = name;
    return this;
  }
  setType(type: string) {
    this.btn.type = type;
    return this;
  }
  setActive(active: boolean) {
    this.btn.active = active;
    return this;
  }
  setValue(value: string | number) {
    this.btn.value = value;
    return this;
  }
  setOnClick(onClick: () => void) {
    this.btn.onClick = onClick;
    return this;
  }
  setOnChange(onChange: () => void) {
    this.btn.onChange = onChange;
    return this;
  }
  build() {
    return this.btn;
  }
}

export class GrimpanMenuBtnDirector {
  static createBackBtn(builder: GrimpanMenuBtnBuilder) {
    const backBtnBuilder = builder
      .setName("뒤로")
      .setType("back")
      .setOnClick(() => {})
      .setActive(false);
    return backBtnBuilder;
  }

  static createForwardBtn(builder: GrimpanMenuBtnBuilder) {
    const forwardBtnBuilder = builder
      .setName("앞으로")
      .setType("forward")
      .setOnClick(() => {})
      .setActive(false);
    return forwardBtnBuilder;
  }
}
GrimpanMenuBtnDirector.createBackBtn(new ChromeGrimpanMenuBtn());
GrimpanMenuBtnDirector.createForwardBtn(new ChromeGrimpanMenuBtn());
