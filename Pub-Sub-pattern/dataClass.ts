import { Subscribable } from './subscribale'

export class DataClass extends Subscribable<number> {

  constructor(public value: number) {
    super();
  }

  setValue(v: number) {
    this.value = v;
    this.publish(v);
  }
}

const dc = new DataClass(0);
const dcUnsub = dc.subscribe((v: number) => console.log(`DC: ${v}`))
dc.setValue(42);
dc.setValue(44);
dc.setValue(45);
dcUnsub();
dc.setValue(47);
