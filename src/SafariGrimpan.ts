import Grimpan from "./AbstractGrimpan.js";

export default class SafariGrimpan extends Grimpan {
  private static instance: SafariGrimpan;

  initialize() {}

  static override getInstance() {
    if (!this.instance) {
      this.instance = new SafariGrimpan(document.querySelector("canvas"));
    }
    return this.instance;
  }
}
