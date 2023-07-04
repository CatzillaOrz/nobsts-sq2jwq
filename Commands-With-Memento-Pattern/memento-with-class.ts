abstract class CommandMemento<State>{
  abstract execute(state: State): State;
}

class CommandStackMemento<State>{
  private stack: string[] = [];
  constructor(private _state: State) {
    this.stack.push(JSON.stringify(_state));
  }

  get state() {
    return JSON.parse(this.stack[this.stack.length - 1]);
  }

  execute(command: CommandMemento<State>) {
    const stringState = JSON.stringify(command.execute(this._state));
    this.stack.push(stringState);
  }

  undo() {
    if (this.stack.length > 0) {
      this.stack.pop();
    }
  }
}

class AddOneMemento extends CommandMemento<number> {
  execute(state: number) {
    return state + 1;
  }
}

class SubtractOneMemento extends CommandMemento<number> {
  execute(state: number) {
    return state - 1;
  }
}

class SetValueMemento extends CommandMemento<number> {
  constructor(private value: number) {
    super();
  }

  execute(state: number) {
    return this.value;
  }
}

const csMemento = new CommandStackMemento<number>(0);
csMemento.execute(new AddOneMemento());
csMemento.execute(new AddOneMemento());
csMemento.execute(new AddOneMemento());
csMemento.execute(new AddOneMemento());
console.log(csMemento.state);
csMemento.undo();
csMemento.execute(new SubtractOneMemento());
csMemento.execute(new SubtractOneMemento());
csMemento.execute(new SubtractOneMemento());
csMemento.execute(new SetValueMemento(100));
console.log(csMemento.state);
csMemento.undo();
csMemento.execute(new SubtractOneMemento());
console.log(csMemento.state);

