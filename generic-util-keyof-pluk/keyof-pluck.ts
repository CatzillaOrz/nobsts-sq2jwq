/**
 * #8 Generic | keyof -> pluck
 */
function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((item) => item[key])
}

const dogs = [
  { name: 'Mimi', age: 12 },
  { name: 'LG', age: 13 },
]

console.log(pluck(dogs, "name"));
console.log(pluck(dogs, "age"));

