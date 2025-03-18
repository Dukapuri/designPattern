import { ChromeGrimpan, IEGrimpan, SafariGrimpan } from "./Grimpan.js";
import { ChromeGrimpanHistory, SafariGrimpanHistory, } from "./GrimpanHistory.js";
import { ChromeGrimpanMenu, IEGrimpanMenu, SafariGrimpanMenu, } from "./GrimpanMenu.js";
export class AbstractGrimpanFactory {
    static createGrimpan() {
        throw new Error("하위 클래스에서 구현하셔야 합니다.");
    }
    static createGrimpanMenu(grimpan, dom) {
        throw new Error("하위 클래스에서 구현하셔야 합니다.");
    }
    static createGrimpanHistory(grimpan) {
        throw new Error("하위 클래스에서 구현하셔야 합니다.");
    }
}
export class ChromeGrimpanFactory extends AbstractGrimpanFactory {
    static createGrimpan() {
        return ChromeGrimpan.getInstance();
    }
    static createGrimpanMenu(grimpan, dom) {
        return ChromeGrimpanMenu.getInstance(grimpan, dom);
    }
    static createGrimpanHistory(grimpan) {
        return ChromeGrimpanHistory.getInstance(grimpan);
    }
}
export class IEGrimpanFactory extends AbstractGrimpanFactory {
    static createGrimpan() {
        return IEGrimpan.getInstance();
    }
    static createGrimpanMenu(grimpan, dom) {
        return IEGrimpanMenu.getInstance(grimpan, dom);
    }
    static createGrimpanHistory(grimpan) {
        return ChromeGrimpanHistory.getInstance(grimpan);
    }
}
export class SafariGrimpanFactory extends AbstractGrimpanFactory {
    static createGrimpan() {
        return SafariGrimpan.getInstance();
    }
    static createGrimpanMenu(grimpan, dom) {
        return SafariGrimpanMenu.getInstance(grimpan, dom);
    }
    static createGrimpanHistory(grimpan) {
        return SafariGrimpanHistory.getInstance(grimpan);
    }
}
