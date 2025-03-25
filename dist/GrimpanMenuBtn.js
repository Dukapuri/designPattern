class GrimpanMenuElementBuilder {
    btn;
    constructor() { }
    build() {
        return this.btn;
    }
}
class GrimpanMenuElement {
    menu;
    name;
    type;
    constructor(menu, name, type) {
        this.menu = menu;
        this.name = name;
        this.type = type;
    }
}
export class GrimpanMenuInput extends GrimpanMenuElement {
    onChange;
    value;
    constructor(menu, name, type, onChange, value) {
        super(menu, name, type);
        this.onChange = onChange;
        this.value = value;
    }
    static Builder = class GrimpanMenuInputBuilder extends GrimpanMenuElementBuilder {
        btn;
        constructor(menu, name, type) {
            super();
            this.btn = new GrimpanMenuInput(menu, name, type);
        }
        setOnChange(onChange) {
            this.btn.onChange = onChange;
            return this;
        }
        setValue(value) {
            this.btn.value = value;
            return this;
        }
        build() {
            return this.btn;
        }
    };
    draw(visitor) {
        return visitor.drawInput(this);
    }
}
export class GrimpanMenuBtn extends GrimpanMenuElement {
    onClick;
    active;
    constructor(menu, name, type, onClick, active) {
        super(menu, name, type);
        this.active = active;
        this.onClick = onClick;
    }
    draw(visitor) {
        return visitor.drawBtn(this);
    }
    static Builder = class GrimpanMenuBtnBuilder extends GrimpanMenuElementBuilder {
        btn;
        constructor(menu, name, type) {
            super();
            this.btn = new GrimpanMenuBtn(menu, name, type);
        }
        setOnClick(onClick) {
            this.btn.onClick = onClick;
            return this;
        }
        setActive(active) {
            this.btn.active = active;
            return this;
        }
        build() {
            return this.btn;
        }
    };
}
export class GrimpanMenuSaveBtn extends GrimpanMenuBtn {
    onClickBlur;
    onClickInvert;
    onClickGrayScale;
    constructor(menu, name, type, onClick, active) {
        super(menu, name, type);
        this.active = active;
        this.onClick = onClick;
    }
    static Builder = class GrimpanMenuSaveBtnBuilder extends GrimpanMenuElementBuilder {
        btn;
        constructor(menu, name, type) {
            super();
            this.btn = new GrimpanMenuSaveBtn(menu, name, type);
        }
        setOnClick(onClick) {
            this.btn.onClick = onClick;
            return this;
        }
        setActive(active) {
            this.btn.active = active;
            return this;
        }
        setFilterListeners(listeners) {
            this.btn.onClickBlur = listeners.blur;
            this.btn.onClickInvert = listeners.invert;
            this.btn.onClickGrayScale = listeners.grayScale;
            return this;
        }
        build() {
            return this.btn;
        }
    };
    draw(visitor) {
        return visitor.drawSaveBtn(this);
    }
}
