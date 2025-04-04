import { BackCommand, ForwardCommand, SaveCommand, SaveHistoryCommand, } from "./commands/index.js";
import { GrimpanMenuBtn, GrimpanMenuInput, GrimpanMenuSaveBtn, } from "./GrimpanMenuBtn.js";
import { SubscriptionManager } from "./Observer.js";
import { ChromeMenuDrawVisitor } from "./MenuDrawVisitor.js";
export class GrimpanMenu {
    grimpan;
    dom;
    colorBtn;
    menuDrawVisitor;
    saveSetting = {
        blur: false,
        invert: false,
        grayScale: false,
    };
    constructor(grimpan, dom) {
        this.grimpan = grimpan;
        this.dom = dom;
        SubscriptionManager.getInstance().subscribe("saveComplete", {
            name: "menu",
            publish: this.afterSaveComplete.bind(this),
        });
    }
    static getInstance(grimpan, dom) { }
    setActiveBtn(btn) {
        document.querySelector(".active")?.classList.remove("active");
        document.querySelector(`#${btn}-btn`)?.classList.add("active");
    }
    executeCommand(command) {
        // 비활성화 로직 수정 권한에 대한 로직을 넣어도 좋을 것 같음
        // if (비활성화) {
        //   return;
        // }
        command.execute();
    }
    afterSaveComplete() {
        console.log("afterSaveComplete This is GrimpanMenu");
    }
    cancleSaveCompleteAlarm() {
        SubscriptionManager.getInstance().unsubscribe("saveComplete", "menu");
    }
}
export class IEGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize(types) { }
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new IEGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
}
export class ChromeGrimpanMenu extends GrimpanMenu {
    static instance;
    constructor(grimpan, dom, menuDrawVisitor = new ChromeMenuDrawVisitor()) {
        super(grimpan, dom);
        this.menuDrawVisitor = menuDrawVisitor;
    }
    initialize(types) {
        types.forEach((type) => {
            const btn = this.drawButtonByType.bind(this)(type);
            btn.draw(this.menuDrawVisitor);
        });
        this.grimpan.setMode("pen");
        this.executeCommand(new SaveHistoryCommand(this.grimpan));
    }
    onClickBack() {
        this.executeCommand(new BackCommand(this.grimpan.history)); // { name: 'back' };
    }
    onClickForward() {
        this.executeCommand(new ForwardCommand(this.grimpan.history));
    }
    onClickPen() {
        this.grimpan.setMode("pen");
    }
    onClickEraser() {
        this.grimpan.setMode("eraser");
    }
    onClickCircle() {
        this.grimpan.setMode("circle");
    }
    onClickRectangle() {
        this.grimpan.setMode("rectangle");
    }
    onClickPipette() {
        this.grimpan.setMode("pipette");
    }
    onClickSave() {
        this.executeCommand(new SaveCommand(this.grimpan));
    }
    drawButtonByType(type) {
        switch (type) {
            case "back": {
                const btn = new GrimpanMenuBtn.Builder(this, "뒤로", type)
                    .setOnClick(this.onClickBack.bind(this))
                    .build();
                return btn;
            }
            case "forward": {
                const btn = new GrimpanMenuBtn.Builder(this, "앞으로", type)
                    .setOnClick(this.onClickForward.bind(this))
                    .build();
                return btn;
            }
            case "color": {
                const btn = new GrimpanMenuInput.Builder(this, "컬러", type)
                    .setOnChange((e) => {
                    this.grimpan.setColor(e.target.value);
                })
                    .build();
                return btn;
            }
            case "pipette": {
                const btn = new GrimpanMenuBtn.Builder(this, "스포이드", type)
                    .setOnClick(this.onClickPipette.bind(this))
                    .build();
                return btn;
            }
            case "eraser": {
                const btn = new GrimpanMenuBtn.Builder(this, "지우개", type)
                    .setOnClick(this.onClickEraser.bind(this))
                    .build();
                return btn;
            }
            case "pen": {
                const btn = new GrimpanMenuBtn.Builder(this, "펜", type)
                    .setOnClick(this.onClickPen.bind(this))
                    .build();
                return btn;
            }
            case "circle": {
                const btn = new GrimpanMenuBtn.Builder(this, "원", type)
                    .setOnClick(this.onClickCircle.bind(this))
                    .build();
                return btn;
            }
            case "rectangle": {
                const btn = new GrimpanMenuBtn.Builder(this, "사각형", type)
                    .setOnClick(this.onClickRectangle.bind(this))
                    .build();
                return btn;
            }
            case "save": {
                const btn = new GrimpanMenuSaveBtn.Builder(this, "저장", type)
                    .setOnClick(this.onClickSave.bind(this))
                    .setFilterListeners({
                    blur: (e) => {
                        this.saveSetting.blur = e.target.checked;
                    },
                    invert: (e) => {
                        this.saveSetting.invert = e.target.checked;
                    },
                    grayScale: (e) => {
                        this.saveSetting.grayScale = e.target.checked;
                    },
                })
                    .build();
                return btn;
            }
            default:
                throw new Error(`알 수 없는 타입 ${type}`);
        }
    }
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
}
export class SafariGrimpanMenu extends GrimpanMenu {
    static instance;
    initialize(types) { }
    static getInstance(grimpan, dom) {
        if (!this.instance) {
            this.instance = new SafariGrimpanMenu(grimpan, dom);
        }
        return this.instance;
    }
}
