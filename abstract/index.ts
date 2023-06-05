/**
 * @abstract class is like a [template class]
 */
abstract class StreetFighter {
  constructor() { }

  move() { }
  fight() {
    console.log(`${this.name} attack with ${this.getSpecialAttack()}`);

  }

  abstract get name(): string;

  abstract getSpecialAttack(): string;
}

/**
 * @abstract can't be initated 
 */
//const ryu = new StreetFighter();

/**
 * @Ryu abstract from StreetFighter
 */
class Ryu extends StreetFighter {
  getSpecialAttack(): string {
    return "Hadoken";
  }
  get name() {
    return "Ryu"
  }
}

const ryu = new Ryu();

ryu.fight();

/**
 * @ChunLi abstract from StreetFighter
 */
class ChunLi extends StreetFighter {
  getSpecialAttack(): string {
    return "Lighhtning Kick";
  }
  get name() {
    return "Chun-Li"
  }
}

const chunli = new ChunLi();
chunli.fight();

