class GrimpanMenuBtn {
  private name: string;
  private type: string;
  private onClick?: () => void;
  private onChange?: () => void;
  private active?: boolean;
  private value?: string | number;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }

  static Builder = class GrimpanMenuBtnBuilder {
    btn: GrimpanMenuBtn;
    constructor(name: string, type: string) {
      this.btn = new GrimpanMenuBtn(name, type);
    }

    setName(name: string) {
      this.btn.name = name;
      return this;
    }
    setType(type: string) {
      this.btn.type = type;
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
    setActive(active: boolean) {
      this.btn.active = active;
      return this;
    }
    setValue(value: string | number) {
      this.btn.value = value;
      return this;
    }
    build() {
      return this.btn;
    }
  };
}
