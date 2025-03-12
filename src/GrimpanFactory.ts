import Grimpan from "./AbstractGrimpan";
import ChromeGrimpan from "./ChromeGrimpan";
import {
  ChromeGrimpanHistory,
  IEGrimpanHistory,
  SafariGrimpanHistory,
} from "./GrimpanHistory";
import {
  ChromeGrimpanMenu,
  IEGrimpanMenu,
  SafariGrimpanMenu,
} from "./GrimpanMenu";
import IEGrimpan from "./IEGrimpan";
import SafariGrimpan from "./SafariGrimpan";

export abstract class AbstractGrimpanFactory {
  static createGrimpan(): Grimpan {
    throw new Error("하위 클래스에서 구현하셔야 합니다.");
  }

  static createGrimpanMenu(grimpan: Grimpan) {
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

  static override createGrimpanMenu(grimpan: ChromeGrimpan) {
    return ChromeGrimpanMenu.getInstance(grimpan);
  }

  static override createGrimpanHistory(grimpan: ChromeGrimpan) {
    return ChromeGrimpanHistory.getInstance(grimpan);
  }
}

export class IEGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return IEGrimpan.getInstance();
  }

  static override createGrimpanMenu(grimpan: IEGrimpan) {
    return IEGrimpanMenu.getInstance(grimpan);
  }

  static override createGrimpanHistory(grimpan: ChromeGrimpan) {
    return ChromeGrimpanHistory.getInstance(grimpan);
  }
}

export class SafariGrimpanFactory extends AbstractGrimpanFactory {
  static override createGrimpan() {
    return SafariGrimpan.getInstance();
  }

  static override createGrimpanMenu(grimpan: IEGrimpan) {
    return SafariGrimpanMenu.getInstance(grimpan);
  }

  static override createGrimpanHistory(grimpan: ChromeGrimpan) {
    return SafariGrimpanHistory.getInstance(grimpan);
  }
}
