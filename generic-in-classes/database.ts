/**
 * Class Members
 */
interface IDatabase<T> {
  get(id: string): T;
  set(id: string, value: T): void;
}

interface IPersistable {
  saveToString(): string;
  resotreFromeString(storedStated: string): void;
}

/**
 * Implimentation DataBase
 * @private db
 * @protected db
 */
class IInMemoryDatabase<T> implements IDatabase<T> {
  //private db: Record<string, string> = {}
  protected db: Record<string, T> = {}

  get(id: string): T {
    return this.db[id]
  }

  set(id: string, value: T): void {
    this.db[id] = value;
  }
}
/**
 * Implimentation Persistable Extends Datebase
 * Change Private db => Protected db
 */
class IPersistenMemoryDB<T> extends IInMemoryDatabase<T> implements IPersistable {
  saveToString(): string {
    return JSON.stringify(this.db)
  }
  resotreFromeString(storedStated: string): void {
    this.db = JSON.parse(storedStated)
  }
}

const myDB_ = new IPersistenMemoryDB<number>();
myDB_.set('foo',22)
//myDB_.db['foo'] = 'barz'
console.log(myDB_.get('foo'));
console.log(myDB_.saveToString());

const savedStr_ = myDB_.saveToString();

const myDB2_ = new IPersistenMemoryDB()
myDB2_.resotreFromeString(savedStr_)
console.log(myDB2_.get('foo'));



