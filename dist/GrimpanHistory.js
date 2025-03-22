class HistoryStack extends Array {
    clone() {
        return this.slice();
    }
}
export class GrimpanHistory {
    grimpan;
    stack;
    constructor(grimpan) {
        this.grimpan = grimpan;
        this.stack = new HistoryStack();
        this.grimpan.saveCompleteObserver.subscribe({
            name: "history",
            publish: this.afterSaveComplete.bind(this),
        });
    }
    getStack() {
        return this.stack.clone();
    }
    setStack(stack) {
        this.stack = stack.clone();
    }
    afterSaveComplete() {
        console.log("afterSaveComplete This is GrimpanHistory");
    }
    cancleSaveCompleteAlarm() {
        this.grimpan.saveCompleteObserver.unsubscribe("history");
    }
    static getInstance(grimpan) { }
}
export class IEGrimpanHistory extends GrimpanHistory {
    static instance;
    initialize() { }
    static getInstance(grimpan) {
        if (!this.instance) {
            this.instance = new IEGrimpanHistory(grimpan);
        }
        return this.instance;
    }
    undo() { }
    redo() { }
}
export class ChromeGrimpanHistory extends GrimpanHistory {
    static instance;
    initialize() { }
    static getInstance(grimpan) {
        if (!this.instance) {
            this.instance = new ChromeGrimpanHistory(grimpan);
        }
        return this.instance;
    }
    undo() { }
    redo() { }
}
export class SafariGrimpanHistory extends GrimpanHistory {
    static instance;
    initialize() { }
    static getInstance(grimpan) {
        if (!this.instance) {
            this.instance = new SafariGrimpanHistory(grimpan);
        }
        return this.instance;
    }
    undo() { }
    redo() { }
}
