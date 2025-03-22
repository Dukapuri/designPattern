import { BlurFilter, DefaultFilter, GrayscaleFilter, InvertFilter, } from "./filters/index.js";
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
                    let imageData = this.ctx.getImageData(0, 0, 300, 300);
                    const offscreenCanvas = new OffscreenCanvas(300, 300);
                    const offscreenContext = offscreenCanvas.getContext("2d");
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
                                const dataURL = reader.result;
                                console.log("dataURL", dataURL);
                                let url = dataURL.replace(/^data:image\/png/, "data:application/octet-stream");
                                a.href = url;
                                a.click();
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
                    let url = dataURL.replace(/^data:image\/jpeg/, "data:application/octet-stream");
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
                    let url = dataURL.replace(/^data:image\/webp/, "data:application/octet-stream");
                    a.href = url;
                    a.click();
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
