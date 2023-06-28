export class Subscribable<MessageType> {
  constructor() { }

  private subscribers: Set<(msg: MessageType) => void> = new Set();

  subscribe(cb: (msg: MessageType) => void) {
    this.subscribers.add(cb);
    return () => {
      this.subscribers.delete(cb);
    }
  }

  publish(msg: MessageType) {
    this.subscribers.forEach(cb => cb(msg));
  }
}
