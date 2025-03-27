export class Invoker {
    command;
    constructor(command) {
        this.command = command;
    }
    invoke() {
        this.command.run();
    }
}
export class Adapter {
    command;
    constructor(command) {
        this.command = command;
    }
    run() {
        this.command.execute();
    }
}
// new Invoker(new Adapter(new BackCommand({} as GrimpanHistory)));
class CommandDecorate {
    command;
    name;
    constructor(command) {
        this.command = command;
        this.name = command.name;
    }
}
export const counter = {};
class ExecuteLogger extends CommandDecorate {
    execute() {
        this.command.execute();
    }
}
class ExecuteCounter extends CommandDecorate {
    execute() {
        this.command.execute();
        if (counter[this.command.name]) {
            counter[this.command.name]++;
        }
        else {
            counter[this.command.name] = 1;
        }
    }
}
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
new ExecuteCounter(new ExecuteLogger(new BackCommand({})));
new ExecuteLogger(new ExecuteCounter(new BackCommand({})));
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
    }
}
export class SaveCommand extends Command {
    grimpan;
    name = "save";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        this.grimpan.saveStrategy();
    }
}
export class SaveHistoryCommand extends Command {
    grimpan;
    name = "saveHistory";
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    execute() {
        this.grimpan.history.saveHistory();
    }
}
