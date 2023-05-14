/**
 * tuple is an array each one of the element in the array can be named and have different types
 */

type ThreeDCoordinate = [x: number, y: number, z: number];

function add3DCoordinate(c1: ThreeDCoordinate, c2: ThreeDCoordinate): ThreeDCoordinate {
  return [
    c1[0] + c2[0],
    c1[1] + c2[1],
    c1[2] + c2[1],
  ]
}

// Tuple

function simpleStringState(inital: string): [() => string, (v: string) => void] {
  let str: string = inital;
  return [
    () => str,
    (v: string) => {
      str = v
    }
  ]
}

const [str1getter, str1setter] = simpleStringState('hello');
console.log(str1getter());
str1setter("goodbye");
console.log(str1getter());

