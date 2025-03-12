import Grimpan from "./AbstractGrimpan";
import ChromeGrimpan from "./ChromeGrimpan";
import IEGrimpan from "./IEGrimpan";
import SafariGrimpan from "./SafariGrimpan";
class AbstractGrimpanFactory {
    static createGrimpan() {
        return Grimpan.getInstance();
    }
}
export default AbstractGrimpanFactory;
class ChromeGrimpanFactory extends AbstractGrimpanFactory {
    static createGrimpan() {
        return ChromeGrimpan.getInstance();
    }
}
class IEGrimpanFactory extends AbstractGrimpanFactory {
    static createGrimpan() {
        return IEGrimpan.getInstance();
    }
}
class SafariGrimpanFactory extends AbstractGrimpanFactory {
    static createGrimpan() {
        return SafariGrimpan.getInstance();
    }
}
