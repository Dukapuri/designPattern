export class Command {
}
export class BackCommand extends Command {
    history;
    name = "back";
    constructor(history) {
        super();
        this.history = history;
    }
    execute() {
        this.history.undo();
    }
}
export class ForwardCommand extends Command {
    history;
    name = "forward";
    constructor(history) {
        super();
        this.history = history;
    }
    execute() {
        this.history.redo();
    }
}
export class PenSelectCommand extends Command {
    grimpan;
    name = "penSelect";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        this.grimpan.menu.setActiveBtn("pen");
        this.grimpan.setMode("pen");
    }
}
export class EraserSelectCommand extends Command {
    grimpan;
    name = "eraserSelect";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        this.grimpan.menu.setActiveBtn("eraser");
        this.grimpan.setMode("eraser");
    }
}
export class CircleSelectCommand extends Command {
    grimpan;
    name = "circleSelect";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        this.grimpan.menu.setActiveBtn("circle");
        this.grimpan.setMode("circle");
    }
}
export class RectangleSelectCommand extends Command {
    grimpan;
    name = "rectangleSelect";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        this.grimpan.menu.setActiveBtn("rectangle");
        this.grimpan.setMode("rectangle");
    }
}
export class PipetteSelectCommand extends Command {
    grimpan;
    name = "pipetteSelect";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        this.grimpan.menu.setActiveBtn("pipette");
        this.grimpan.setMode("pipette");
    }
}
