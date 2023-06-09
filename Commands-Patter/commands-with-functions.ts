type CommandFunction<State> = (state: State) => [
  State,
  (state: State) => State
]

function CreateCommandStack<State>(state: State) {
  const stack: ((state: State) => State)[] = [];
  let _state = state;
  return {
    execute(command: CommandFunction<State>) {
      const [newState, undoFunction] = command(_state);
      _state = newState;
      stack.push(undoFunction);
      return _state;
    },
    undo() {
      const command = stack.pop();
      if (command) {
        _state = command(_state);
      }
      return _state;
    }
  }
}

const addOne: CommandFunction<number> = (state) => [
  state + 1,
  (state) => state - 1
]

const subtractOne: CommandFunction<number> = (state) => [
  state - 1,
  (state) => state + 1
]

const createSetValue = (value: number): CommandFunction<number> => {
  return (state) => {
    const _originalState = state;
    return [value, () => _originalState]
  }
}
const cStack = CreateCommandStack(0);
console.log(cStack.execute(addOne));
console.log(cStack.undo());
console.log(cStack.execute(subtractOne));
console.log(cStack.undo());
const setTo442 = createSetValue(442);
console.log(cStack.execute(setTo442));
console.log(cStack.undo());

