import Grimpan from "./AbstractGrimpan.js";
import ChromeGrimpan from "./ChromeGrimpan.js";
import {
  ChromeGrimpanHistory,
  IEGrimpanHistory,
  SafariGrimpanHistory,
} from "./GrimpanHistory.js";
import {
  ChromeGrimpanMenu,
  IEGrimpanMenu,
  SafariGrimpanMenu,
} from "./GrimpanMenu.js";
import IEGrimpan from "./IEGrimpan.js";
import SafariGrimpan from "./SafariGrimpan.js";

export abstract class AbstractGrimpanFactory {
  static createGrimpan(): Grimpan {
    throw new Error("하위 클래스에서 구현하셔야 합니다.");
  }

  static createGrimpanMenu(grimpan: Grimpan, dom: HTMLElement) {
    throw new Error("하위 클래스에서 구현하셔야 합니다.");
  }

  static createGrimpanHistory(grimpan: Grimpan) {
    throw new Error("하위 클래스에서 구현하셔야 합니다.");
  }
}

export class ChromeGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return ChromeGrimpan.getInstance();
  }

  static override createGrimpanMenu(grimpan: ChromeGrimpan, dom: HTMLElement) {
    return ChromeGrimpanMenu.getInstance(grimpan, dom);
  }

  static override createGrimpanHistory(grimpan: ChromeGrimpan) {
    return ChromeGrimpanHistory.getInstance(grimpan);
  }
}

export class IEGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return IEGrimpan.getInstance();
  }

  static override createGrimpanMenu(grimpan: IEGrimpan, dom: HTMLElement) {
    return IEGrimpanMenu.getInstance(grimpan, dom);
  }

  static override createGrimpanHistory(grimpan: ChromeGrimpan) {
    return ChromeGrimpanHistory.getInstance(grimpan);
  }
}

export class SafariGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return SafariGrimpan.getInstance();
  }

  static override createGrimpanMenu(grimpan: SafariGrimpan, dom: HTMLElement) {
    return SafariGrimpanMenu.getInstance(grimpan, dom);
  }

  static override createGrimpanHistory(grimpan: SafariGrimpan) {
    return SafariGrimpanHistory.getInstance(grimpan);
  }
}
