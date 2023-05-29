/**
 * Class Members
 */
interface IDatabase<T, K> {
  get(id: K): T;
  set(id: K, value: T): void;
}

interface IPersistable {
  saveToString(): string;
  resotreFromeString(storedStated: string): void;
}

type DBKeyTYpe = string | number | symbol;
/**
 * Implimentation DataBase
 * @private db
 * @protected db
 */
class IInMemoryDatabase<T, K extends DBKeyTYpe> implements IDatabase<T, K> {
  //private db: Record<string, string> = {}
  protected db: Record<K, T> = {} as Record<K, T>

  get(id: K): T {
    return this.db[id]
  }

  set(id: K, value: T): void {
    this.db[id] = value;
  }
}
/**
 * Implimentation Persistable Extends Datebase
 * Change Private db => Protected db
 */
class IPersistenMemoryDB<T, K extends DBKeyTYpe> extends IInMemoryDatabase<T, K> implements IPersistable {
  saveToString(): string {
    return JSON.stringify(this.db)
  }
  resotreFromeString(storedStated: string): void {
    this.db = JSON.parse(storedStated)
  }
}

const myDB_ = new IPersistenMemoryDB<number, string>();
myDB_.set('foo',22)
//myDB_.db['foo'] = 'barz'
console.log(myDB_.get('foo'));
console.log(myDB_.saveToString());

const savedStr_ = myDB_.saveToString();

const myDB2_ = new IPersistenMemoryDB()
myDB2_.resotreFromeString(savedStr_)
console.log(myDB2_.get('foo'));



