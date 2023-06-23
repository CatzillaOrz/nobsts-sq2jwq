/**
 * @api pokeapi.co/api/
 * @offset
 * @limit
 * @url https://pokeapi.co/api/v2/pokemon?offset=10&limit=10
 *
 * @node-fetch
 * @node-fetch-types
 *
 */
import fetch from 'node-fetch';

/**
 * @type api results
 */
interface PokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

/**
 * @type fetchPokemon return type
 */
type FetchPokemonResult<T> = T extends undefined
  ? void
  : Promise<PokemonResults>

function fetchPokemon<T extends undefined | ((data: PokemonResults) => void)>(
  url: string,
  cb?: T
): FetchPokemonResult<T> {
  if (cb) {
    fetch(url)
      .then(resp => resp.json())
      .then(cb)
    return undefined as FetchPokemonResult<T>;
  } else {
    return fetch(url).then(resp => resp.json()) as FetchPokemonResult<T>;

  }
}

/**
fetchPokemon(
  "https://pokeapi.co/api/v2/pokemon?offset=10&limit=10",
  (data) => {
    data.results.forEach(pokemon => {
      console.log(pokemon.name);
    });
  }
)
*/

/**
*/

(async function() {
  const data = await fetchPokemon("https://pokeapi.co/api/v2/pokemon?offset=10&limit=10") as PokemonResults;
  data.results.forEach(pokemon => console.log(pokemon.name))
})()
