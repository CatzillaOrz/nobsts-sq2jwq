function simpleStringState<T>(inital: T): [() => T, (v: T) => void] {
  let str: T = inital;
  return [
    () => str,
    (v: T) => {
      str = v
    }
  ]
}

const [st1getter, st1setter] = simpleStringState(10)
console.log(st1getter());
st1setter(62)
console.log(st1getter());

/*
 * Overriding inferred generic types
 */
const [st2getter, st2setter] = simpleStringState<string | null>(null)
console.log(st2getter());
st2setter(
  'string'
)
console.log(st2getter());

/**
 * Rank<RankItem>
 */
interface Rank<RankItem> {
  item: RankItem;
  rank: number;
}
function ranker<RankItem>(items: RankItem[], rank: (v: RankItem) => number): RankItem[] {
  const ranks: Rank<RankItem>[] = items.map((item) => ({
    item,
    rank: rank(item)
  }))

  ranks.sort((a, b) => a.rank - b.rank)

  return ranks.map(rank => rank.item)

}

/**
 * Pokemon
 */
interface Pokemon {
  name: string;
  hp: number;
}

const pokemon: Pokemon[] = [
  {
    name: "bulbasaur",
    hp: 20,
  },
  {
    name: "Megaasaur",
    hp: 5,
  }
]

const ranks = ranker(pokemon, ({ hp }) => hp);
console.log(ranks);

