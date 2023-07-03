import fetch from 'node-fetch';
import { Pokemon } from './index'

async function* interateResults<DataType>(
  url: string
) {
  let nextUrl: string | undefined = url;
  do {
    const response = await fetch(nextUrl);
    const json: {
      next?: string;
      results: DataType[];
    } = await response.json();
    yield* json.results;
    nextUrl = json.next;
  } while (nextUrl);
}

(async function() {
  for await (const result of interateResults<Pokemon>(
    'https://pokeapi.co/api/v2/pokemon',
  )) {
    console.log(result);
    if (result.name === 'pikachu') {
      break;
    }
  }
})()
