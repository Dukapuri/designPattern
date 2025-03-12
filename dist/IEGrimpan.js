import Grimpan from "./AbstractGrimpan";
export default class IEGrimpan extends Grimpan {
    static instance;
    initialize() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new IEGrimpan(document.querySelector("canvas"));
        }
        return this.instance;
    }
}
