/**
 * @type: filter
 * @note: if runtime error occur, use nvm 16,to fix
 */
type Handler<T> = {
  [Prop in keyof T as `map${Capitalize<string & Prop>}`]?:
  (data: T[Prop]) => T[Prop];
} & {
    [Prop in keyof T as `filter${Capitalize<string & Prop>}`]?:
    (data: T[Prop]) => boolean;
  }
type ProcessedEventAdv<T> = {
  eventName: keyof T,
  data: T[keyof T]
}

/**
 * @class: EventProcessor
 */
class EventProcessorAdv<T extends {}> {
  private handlers: Handler<T>[] = [];
  private processed: ProcessedEventAdv<T>[] = [];

  handleEvent<K extends keyof T>(eventName: K, data: T[K]): void {
    let allowEvent = true;
    const capitalize = (s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`
    for (const handler of this.handlers) {
      const filterFunc = handler[`on${capitalize(eventName)}`];
      if (filterFunc && !filterFunc(data)) {
        allowEvent = false;
        break;
      }
    }
    if (allowEvent) {
      let mappedData = { ...data }
      for (const handler of this.handlers) {
        const mapFunc = handler[`map${capitalize(eventName)}`];
        if (mapFunc) {
          mappedData = <T[K]>mapFunc(mappedData)
        }
      }
      this.processed.push({
        eventName,
        data: mappedData
      })
    }
  }

  addHandler(handler: Handler<T>) {
    this.handlers.push(handler);
  }

  getProcessedEvents() {
    return this.processed;
  }
}

interface EventMapAdv {
  login: { user?: string; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

class UserEventProAdv extends EventProcessorAdv<EventMapAdv>{ }

const uepAdv = new UserEventProAdv();

uepAdv.addHandler({
  filterLogin: ({ user }) => Boolean(user),
  mapLogin: (data) => ({
    ...data,
    hasSession: Boolean(data.user && data.name)
  })
})


uepAdv.handleEvent("logout", {
  user: 'jack'
})

uepAdv.handleEvent("login", {
  user: 'Tom',
  name: 'Tomas'
})

console.log(uepAdv.getProcessedEvents());

