import * as fs from 'fs'
export function createHandlerStack<MessageType>() {
  const subscribers: Set<(msg: MessageType) => undefined | unknown> = new Set();

  return {
    subscribe(cb: (msg: MessageType) => undefined | unknown) {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      }
    },

    publish(msg: MessageType): undefined | unknown {
      let data: unknown;
      for (const subscriber of Array.from(subscribers)) {
        data = subscriber(msg);
        if (data !== undefined) {
          break;
        }
      }
      return data;
    }
  }
}


const handler = createHandlerStack<{
  name: string;
  content: string;
}>();

handler.subscribe(({ name, content }) => {
  if (name.endsWith('json')) {
    return content = JSON.parse(content)
  }
})
handler.subscribe(({ content }) => content)

for (const name of fs.readdirSync('./files')) {
  const content = fs.readFileSync(`./files/${name}`, 'utf8');
  const output = handler.publish({ name, content });
  console.log(`${name}, ${JSON.stringify(output)}`);

}

