import houses from './houses'

interface House {
  name: string;
  planets: string | string[];
}

interface HouseWithId {
  id: number;
  name: string;
  planets: string | string[];
}

function findHouses(houses: string): HouseWithId[];
function findHouses(
  houses: string,
  filter: (house: House) => boolean
): HouseWithId[];

function findHouses(houses: House[]): HouseWithId[];
function findHouses(
  houses: House[],
  filter: (house: House) => boolean
): HouseWithId[];

function findHouses(
  input: string | House[],
  filter?: (house: House) => boolean
): HouseWithId[] {
  const houses: House[] = typeof input === 'string' ? JSON.parse(input) : input;

  return (filter ? houses.filter(filter) : houses).map(house => (
    {
      id: houses.indexOf(house),
      ...house
    }
  ))
}

console.log(findHouses(JSON.stringify(houses), ({ name }) => name === 'Atreides'));
console.log(findHouses(JSON.stringify(houses), ({ name }) => name === 'Harkonnen'));

