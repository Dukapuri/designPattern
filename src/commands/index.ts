import { Grimpan } from "../Grimpan.js";
import { GrimpanHistory } from "../GrimpanHistory.js";

export class Invoker {
  constructor(private readonly command: { run(): void }) {}
  invoke() {
    this.command.run();
  }
}

export class Adapter {
  constructor(private readonly command: Command) {}
  run() {
    this.command.execute();
  }
}

// new Invoker(new Adapter(new BackCommand({} as GrimpanHistory)));

abstract class CommandDecorate {
  name: string;
  constructor(protected readonly command: Command) {
    this.name = command.name;
  }
  abstract execute(): void;
}

export const counter: { [key: string]: number } = {};

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
    } else {
      counter[this.command.name] = 1;
    }
  }
}

export abstract class Command {
  abstract name: string;
  abstract execute(): void;
}

function countCommand(
  value: typeof BackCommand,
  context: ClassDecoratorContext
) {
  return class extends value {
    override execute() {
      super.execute();
      if (counter[this.name]) {
        counter[this.name]++;
      } else {
        counter[this.name] = 1;
      }
    }
  };
}

function logger(value: typeof BackCommand, context: ClassDecoratorContext) {
  return class extends value {
    override execute() {
      console.log(this.name + ` 명령을 실행합니다.`);
      super.execute();
    }
  };
}

@countCommand
@logger
export class BackCommand extends Command {
  name = "back";

  constructor(public history: GrimpanHistory) {
    super();
  }

  override execute() {
    this.history.undo();
  }
}

// new ExecuteCounter(new ExecuteLogger(new BackCommand({} as GrimpanHistory)));
// new ExecuteLogger(new ExecuteCounter(new BackCommand({} as GrimpanHistory)));

export class ForwardCommand extends Command {
  name = "forward";

  constructor(public history: GrimpanHistory) {
    super();
  }

  override execute() {
    this.history.redo();
  }
}

export class PenSelectCommand extends Command {
  name = "penSelect";
  constructor(private grimpan: Grimpan) {
    super();
  }
  override execute() {
    this.grimpan.menu.setActiveBtn("pen");
  }
}

export class EraserSelectCommand extends Command {
  name = "eraserSelect";
  constructor(private grimpan: Grimpan) {
    super();
  }
  override execute() {
    this.grimpan.menu.setActiveBtn("eraser");
  }
}

export class CircleSelectCommand extends Command {
  name = "circleSelect";
  constructor(private grimpan: Grimpan) {
    super();
  }
  override execute() {
    this.grimpan.menu.setActiveBtn("circle");
  }
}

export class RectangleSelectCommand extends Command {
  name = "rectangleSelect";
  constructor(private grimpan: Grimpan) {
    super();
  }
  override execute() {
    this.grimpan.menu.setActiveBtn("rectangle");
  }
}

export class PipetteSelectCommand extends Command {
  name = "pipetteSelect";
  constructor(private grimpan: Grimpan) {
    super();
  }
  override execute() {
    this.grimpan.menu.setActiveBtn("pipette");
  }
}

export class SaveCommand extends Command {
  name = "save";
  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute() {
    this.grimpan.saveStrategy();
  }
}

export class SaveHistoryCommand extends Command {
  name = "saveHistory";

  constructor(private grimpan: Grimpan) {
    super();
  }

  override execute(): void {
    this.grimpan.history.saveHistory();
  }
}
