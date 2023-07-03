import fetch from "node-fetch";
import { Pokemon } from './index'


async function visit<DataType>(baseUrl: string, visitor: (result: DataType[]) => void) {
  let nextUrl: string | undefined = baseUrl;
  do {
    const response = await fetch(nextUrl);
    const json: {
      next?: string;
      results: DataType[];
    } = await response.json();
    visitor(json.results);
    nextUrl = json.next;
  } while (nextUrl);

}

visit<Pokemon[]>(
  'https://pokeapi.co/api/v2/pokemon',
  (results) => console.log(results)
)

