/**
 * @functionality
 * create a function that return a function
 */

function myLogFunction() {
  return (str: string) => {
    console.log(str);
  }
}

const logger = myLogFunction();
logger("your string!")

/**
 * @mixins 
 * create a function that return a Class
 */
function createLoggerClass() {
  return class MyLoggerClass {
    private completeLog: string = "";
    log(str: string) {
      console.log(str);
      this.completeLog += str + "\n";
    }

    dumpLog() {
      return this.completeLog;
    }
  }
}

const Myloger = createLoggerClass();
const logger2 = new Myloger();
logger2.log("Foo")
console.log(logger2.dumpLog());

/**
 * @function creating A Generic Class
 */
function CreateSimpleMemoryDatabase<T>() {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {};

    set(id: string, value: T) {
      this.db[id] = value;
    }

    get(id: string): T {
      return this.db[id];
    }

    getObject(): object {
      return this.db;
    }

  }
}

const StringDatabase = CreateSimpleMemoryDatabase<string>();

const sdb1 = new StringDatabase();
sdb1.set('a', 'hello');

/**
 * @creating a mixin function Like: dumpLog()
 * @type : we need a type that return a Object and use Generic with this type 
 * and return the Generic Type with it
 */
type Constructor<T> = new (...args: any[]) => T; //

/**
 * @<T extends Constructor<{getObject(): object;}>>
 * we narrowing down what dumpable can be applyed to just classes that
 * have that get Object method on them so...
 */
function Dumpable<T extends Constructor<{
  getObject(): object;
}>>(Base: T) {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getObject());
    }
  }
}

const DumpableStringDatabase = Dumpable(StringDatabase);
const sdb2 = new DumpableStringDatabase();
sdb2.set("jack", "hello");
sdb2.dump();
