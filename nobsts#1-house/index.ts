import * as houses from './houses.json'


interface House {
  name: string;
  planets: string | string[];
}

interface HouseWithId extends House {
  id: number;
}

function findHouses(
  input: string | House[],
  filter?: (house: House) => boolean
): HouseWithId[] {
  const houses: House[] = typeof input === 'string' ? JSON.parse(input) : input;

  return (filter && houses ? houses.filter(filter) : houses)?.map(house => (
    {
      id: houses.indexOf(house),
      ...house
    }
  ))
}

console.log(findHouses(JSON.stringify(houses), ({ name }) => name === 'Atreides'));
console.log(findHouses(JSON.stringify(houses), ({ name }) => name === 'Harkonnen'));

