import { useState, useEffect } from "react";

function createSubscribable<MessageType>() {
  const subscribers: Set<(msg: MessageType) => void> = new Set();

  return {
    subscribe(cb: (msg: MessageType) => void) {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      }
    },
    publish(msg: MessageType) {
      subscribers.forEach(cb => cb(msg));
    }
  }
}

export function createStateHook<DataType>(
  initValue: DataType
): () => [
  DataType,
  (value: DataType) => void
] {
  const subscribers = createSubscribable<DataType>();

  return () => {
    const [value, setValue] = useState<DataType>(initValue);
    useEffect(() => subscribers.subscribe(setValue), [])
    return [value, (v: DataType) => {
      setValue(v);
      subscribers.publish(v);
    }]
  }
}

