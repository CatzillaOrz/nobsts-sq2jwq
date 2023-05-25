/**
 * Util Partial<T>
 * type Partial<T> = { [P in keyof T]?: T[P]; }
 * Make all properties in T optional
 */
interface MyUser {
  id: string;
  name: string;
  email?: string;
  phone?: number;
}

type OptonalUser = Partial<MyUser>;

/**
 * Util Reuired<T> 
 * type Required<T> = { [P in keyof T]-?: T[P]; }
 * Make all properties in T required
 */
type ReqiredMyUser = Required<MyUser>;

/**
 * Util Pick<T>
 * type Pick<T, K extends keyof T> = { [P in K]: T[P]; }
 * From T, pick a set of properties whose keys are in the union K
 */
type JustEmailAndName = Pick<MyUser, "email" | "name">

const JustEmail: JustEmailAndName = {
  email: 'helo,',
  name: ''
}

/**
 * 1. Util Record<T>
 * type Record<K extends string | number | symbol, T> = { [P in K]: T; }
 * Construct a type with a set of properties K of type T
 * 2. Omit<T, k>
 * type Omit<T, K extends string | number | symbol> = { [P in Exclude<keyof T, K>]: T[P]; }
 * Construct a type with the properties of T except for those in type K.
 *
 */
type UserWithoutId = Omit<MyUser, 'id'>;
const mapById = (users: MyUser[]): Record<MyUser["id"], UserWithoutId> => {
  return users.reduce((a, v) => {
    const { id, ...other } = v;
    return {
      ...a,
      [id]: other,
    };
  }, {})
}

console.log(mapById([
  {
    id: 'foo',
    name: 'Mr. Foo'
  },
  {
    id: 'bar',
    name: 'Mr. Bar'
  }
]));

