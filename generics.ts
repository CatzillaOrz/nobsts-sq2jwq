function simpleStringState<T>(inital: T): [() => T, (v: T) => void] {
  let str: T = inital;
  return [
    () => str,
    (v: T) => {
      str = v
    }
  ]
}

const [st1getter, st1setter] = simpleStringState(10)
console.log(st1getter());
st1setter(62)
console.log(st1getter());

/*
 * Overriding inferred generic types
 */
const [st2getter, st2setter] = simpleStringState<string | null>(null)
console.log(st2getter());
st2setter(
  'string'
)
console.log(st2getter());
