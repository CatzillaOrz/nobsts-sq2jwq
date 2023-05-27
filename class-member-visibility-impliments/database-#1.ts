/**
 * Class Members
 */
interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

interface Persistable {
  saveToString(): string;
  resotreFromeString(storedStated: string): void;
}

/**
 * Implimentation DataBase
 * @private db
 * @protected db
 */
class InMemoryDatabase implements Database {
  //private db: Record<string, string> = {}
  protected db: Record<string, string> = {}

  get(id: string): string {
    return this.db[id]
  }

  set(id: string, value: string): void {
    this.db[id] = value;
  }
}
/**
 * Implimentation Persistable Extends Datebase
 * Change Private db => Protected db
 */
class PersistenMemoryDB extends InMemoryDatabase implements Persistable {
  saveToString(): string {
    return JSON.stringify(this.db)
  }
  resotreFromeString(storedStated: string): void {
    this.db = JSON.parse(storedStated)
  }
}

const myDB = new PersistenMemoryDB();
myDB.set('foo', 'bar')
//myDB.db['foo'] = 'barz'
console.log(myDB.get('foo'));
console.log(myDB.saveToString());

const savedStr = myDB.saveToString();

const myDB2 = new PersistenMemoryDB()
myDB2.resotreFromeString(savedStr)
console.log(myDB2.get('foo'));



