import Grimpan from "./AbstractGrimpan.js";
export default class SafariGrimpan extends Grimpan {
    static instance;
    initialize() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new SafariGrimpan(document.querySelector("canvas"));
        }
        return this.instance;
    }
}
