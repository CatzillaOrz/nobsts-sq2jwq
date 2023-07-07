import fetch from 'node-fetch'

interface Pokemon {
  species: {
    name: string;
    url: string;
  }
}

interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: {
    name: string;
    url: string;
  }[]
}

(async () => {
  const pokemon = (await (
    await fetch('https://pokeapi.co/api/v2/pokemon'
    )).json()) as PokemonList;
  console.log(pokemon);
  const urls = pokemon.results.reduce(
    (acc, { name, url }) => ({
      ...acc,
      [name]: url,
    }),
    {}
  )
})()
