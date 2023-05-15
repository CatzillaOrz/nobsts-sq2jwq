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

/**
 * #8 Generic | Example in interfaces 
 */
interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  addToCart: BaseEvent & { quantity: number; productId: string },
  checkout: BaseEvent
}

function sendEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name]): void {
  console.log([name, data]);
}

sendEvent("addToCart", {
  productId: 'foo',
  user: 'baz',
  quantity: 1,
  time: 10
})

sendEvent("checkout",{time:20, user: 'bob'} )
