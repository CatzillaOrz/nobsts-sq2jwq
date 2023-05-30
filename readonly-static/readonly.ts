/**
 * @readonly foo
 */
class Doggy {
  public readonly foo: string;
  constructor(public readonly name: string, public age: number) {
  }
}


const lgg = new Doggy("LG", 13);
console.log(lgg);

/**
 * @static instance
 * @private constructor
 * @static addDog method
 */
class DogList {
  private doggies: Doggy[] = [];

  static instance: DogList = new DogList();

  private constructor() { }

  static addDog(dog: Doggy) {
    DogList.instance.doggies.push(dog)
  }

  getDogs() {
    return this.doggies;
  }
}

// get instance
DogList.instance
// Error
// const dl = new DogList();

// addDog
DogList.addDog(lgg)
//get Dog
console.log(DogList.instance.getDogs());

