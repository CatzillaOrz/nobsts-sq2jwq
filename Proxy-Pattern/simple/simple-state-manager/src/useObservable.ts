import { useEffect, useState } from "react";

export function createSubscribale<MessageType>() {
  const subscribers: Set<(msg: MessageType) => void> = new Set();

  return {
    subscibe(cb: (msg: MessageType) => void): () => void {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      }
    },
    publish(msg: MessageType): void {
      subscribers.forEach((cb) => cb(msg));
    }
  }
}

type ObservableMessage<T> = {
  target: T;
  prop: string;
}

type Observable<T> = T & {
  subscribe: (callback: (data: ObservableMessage<T>) => void) => void
}

export function createObservable<DataType>(data: DataType): Observable<DataType> {
  const subscribers = createSubscribale<ObservableMessage<DataType>>();
  return new Proxy({
    ...data,
    subscribe: subscribers.subscibe,
  },
    {
      set: function(target: object, prop: string, value: any) {
        Reflect.set(target, prop, value);
        subscribers.publish({
          target,
          prop,
        } as unknown as ObservableMessage<DataType>);
        return true;
      }
    }
  ) as Observable<DataType>
}

export function useObservable<DataType>(
  observable: Observable<DataType>
): DataType {
  const [, setVersion] = useState(0);
  useEffect(() => {
    observable.subscribe(() => setVersion(v => v + 1));
  },
    [observable]
  );
    return observable as DataType
}
