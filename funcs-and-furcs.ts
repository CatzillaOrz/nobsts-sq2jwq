export function printToFile(text: string, callback: () => void): void {
  console.log(text)
  callback()
}
// define: type Function
export type MutationFunction = (v: number) => number;

export function arrayMutate(
  numbers: number[],
  mutate: MutationFunction
): number[] {
  return numbers.map(mutate);
}
// use: Type MutationFunction
const MyMutationFunction: MutationFunction = (v: number) => v * 100;

console.log(arrayMutate([1, 20, 3], (v) => v * 10))
console.log(MyMutationFunction(4))

// return function
export function createAdder(num: number): (val: number) => number {
  return (val: number) => num + val
}

const addOne = createAdder(1)
console.log(addOne(55))
