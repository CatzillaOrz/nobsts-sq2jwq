import { Subscribable } from './subscribale'

const sub = new Subscribable<string>();
const unsub = sub.subscribe(console.log);
sub.publish("hello")
sub.publish("whatthefunck")
unsub();
sub.publish("goodbye")


