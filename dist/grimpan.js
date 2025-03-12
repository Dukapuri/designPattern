class Grimpan {
    static instance;
    constructor(canvas) {
        if (!canvas) {
            throw new Error("캔버스 엘리먼트를 입력하세요.");
        }
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Grimpan(document.querySelector("#canvas"));
        }
        return this.instance;
    }
}
export default Grimpan;
