type CommandFunctionMementoFn<State> = (state: State) => State;


function CreateCommandStack<State>(state: State) {
  const stack: string[] = [
    JSON.stringify(state)
  ];
  return {
    execute(command: CommandFunctionMementoFn<State>) {
      const currentState = JSON.parse(stack[stack.length - 1]);
      const newState = command(currentState);
      stack.push(JSON.stringify(newState));
      return newState;
    },
    undo() {
      if (stack.length > 1) {
        stack.pop()
      }
      return JSON.parse(stack[stack.length - 1]);
    }
  }
}

const addOneMemento: CommandFunctionMementoFn<number> = (state) => state + 1


const subtractOneMemento: CommandFunctionMementoFn<number> = (state) => state - 1


const createSetValueMemento = (value: number): CommandFunctionMementoFn<number> => {
  return () => value
}

const cStackMemnto = CreateCommandStack(0);
console.log(cStackMemnto.execute(addOneMemento));
console.log(cStackMemnto.undo());
console.log(cStackMemnto.execute(subtractOneMemento));
console.log(cStackMemnto.undo());
const setTo442Memento = createSetValueMemento(442);
console.log(cStackMemnto.execute(setTo442Memento));
console.log(cStackMemnto.undo());

