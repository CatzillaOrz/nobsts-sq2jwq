import { createSubscribable } from './pub-sub-function-variant'

const sub = createSubscribable<string>();
const unsub = sub.subscribe(console.log);
sub.publish("hello")
sub.publish("whatthefunck")
unsub();
sub.publish("goodbye")


