import { useState, useRef, useCallback } from "react";
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

export function useStateWithUndo<DataType>(
  initialState: DataType
): [
    DataType, (state: DataType) => void, () => void
  ] {
  const [state, setState] = useState<DataType>(initialState);
  const stack = useRef(CreateCommandStack(initialState));

  return [
    state,
    useCallback((value: DataType) => {
      const newState = stack.current.execute(() => value);
      setState(newState);
    }, []),
    useCallback(() => {
      const newState = stack.current.undo();
      setState(newState);
    }, []),

  ]
}
