var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
function countCommand(value, context) {
    return class extends value {
        execute() {
            super.execute();
            if (counter[this.name]) {
                counter[this.name]++;
            }
            else {
                counter[this.name] = 1;
            }
        }
    };
}
function logger(value, context) {
    return class extends value {
        execute() {
            console.log(this.name + ` 명령을 실행합니다.`);
            super.execute();
        }
    };
}
let BackCommand = (() => {
    let _classDecorators = [countCommand, logger];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Command;
    var BackCommand = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            BackCommand = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        history;
        name = "back";
        constructor(history) {
            super();
            this.history = history;
        }
        execute() {
            this.history.undo();
        }
    };
    return BackCommand = _classThis;
})();
export { BackCommand };
// new ExecuteCounter(new ExecuteLogger(new BackCommand({} as GrimpanHistory)));
// new ExecuteLogger(new ExecuteCounter(new BackCommand({} as GrimpanHistory)));
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
export class PremiumCommandProxy {
    command;
    name;
    constructor(command) {
        this.command = command;
        this.name = command.name;
    }
    execute() {
        // if (!this.command.loaded) {
        //   this.command.load();
        // }
        if (this.command.grimpan.isPremium) {
            this.command.execute();
        }
        else {
            alert("프리미엄 이용자만 가능합니다.");
        }
    }
}
export class CircleSelectCommand extends Command {
    grimpan;
    name = "circleSelect";
    loaded = false;
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    load() {
        this.loaded = true;
    }
    execute() {
        this.grimpan.menu.setActiveBtn("circle");
    }
}
export class RectangleSelectCommand extends Command {
    grimpan;
    name = "rectangleSelect";
    loaded = false;
    constructor(grimpan) {
        super();
        this.grimpan = grimpan;
    }
    load() {
        this.loaded = true;
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
