import { ChromeGrimpanFactory } from "./GrimpanFactory.js";
import { CircleMode, EraserMode, PenMode, PipetteMode, RectangleMode, } from "./modes/index.js";
export class Grimpan {
    canvas;
    ctx;
    history;
    menu;
    mode;
    color;
    active;
    saveStrategy;
    constructor(canvas) {
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            throw new Error("canvas 엘리먼트를 입력하세요");
        }
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
        this.color = "#000000";
        this.active = false;
        this.setSaveStrategy("png");
    }
    static getInstance() { }
    setMode(mode) {
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
    setSaveStrategy(imageType) {
        switch (imageType) {
            case "png": {
                this.saveStrategy = () => {
                    const a = document.createElement("a");
                    a.download = "canvas.png";
                    const dataUrl = this.canvas.toDataURL("image/png");
                    let url = dataUrl.replace(/^data:image\/png/, "data:application/octet-stream");
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
                    let url = dataUrl.replace(/^data:image\/jpeg/, "data:application/octet-stream");
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
                    let url = dataUrl.replace(/^data:image\/webp/, "data:application/octet-stream");
                    a.href = url;
                    a.click();
                    a.remove();
                };
                break;
            }
        }
    }
    setColor(color) {
        this.color = color;
    }
    changeColor(color) {
        this.setColor(color);
        if (this.menu.colorBtn) {
            this.menu.colorBtn.value = color;
        }
    }
}
export class ChromeGrimpan extends Grimpan {
    static instance;
    menu;
    history;
    constructor(canvas, factory) {
        super(canvas);
        this.menu = factory.createGrimpanMenu(this, document.querySelector("#menu"));
        this.history = factory.createGrimpanHistory(this);
    }
    initialize(option) {
        this.menu.initialize(option.menu);
        this.history.initialize();
        this.canvas.addEventListener("mousedown", this.onMousedown.bind(this));
        this.canvas.addEventListener("mousemove", this.onMousemove.bind(this));
        this.canvas.addEventListener("mouseup", this.onMouseup.bind(this));
    }
    onMousedown(e) {
        this.mode.onMousedown(e);
    }
    onMousemove(e) {
        this.mode.onMousemove(e);
    }
    onMouseup(e) {
        this.mode.onMouseup(e);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ChromeGrimpan(document.querySelector("canvas"), ChromeGrimpanFactory);
        }
        return this.instance;
    }
}
export class IEGrimpan extends Grimpan {
    static instance;
    initialize() { }
    onMousedown(e) { }
    onMousemove(e) { }
    onMouseup(e) { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new IEGrimpan(document.querySelector("canvas"));
        }
        return this.instance;
    }
}
export class SafariGrimpan extends Grimpan {
    static instance;
    initialize() { }
    onMousedown(e) { }
    onMousemove(e) { }
    onMouseup(e) { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new SafariGrimpan(document.querySelector("canvas"));
        }
        return this.instance;
    }
}
