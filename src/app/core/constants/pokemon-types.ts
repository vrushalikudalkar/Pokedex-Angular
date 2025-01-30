export interface PokemonTypeColor {
  color: string;
  hex: string;
}

interface PokemonTypeInfo {
  color: string;
  hex: string;
}

interface PokemonTypes {
  [key: string]: PokemonTypeInfo;
}

export const POKEMON_TYPE: Readonly<PokemonTypes> = {
  normal: { color: '#A8A878', hex: '#A8A878' },
  fighting: { color: '#C03028', hex: '#C03028' },
  flying: { color: '#A890F0', hex: '#A890F0' },
  poison: { color: '#A040A0', hex: '#A040A0' },
  ground: { color: '#E0C068', hex: '#E0C068' },
  rock: { color: '#B8A038', hex: '#B8A038' },
  bug: { color: '#A8B820', hex: '#A8B820' },
  ghost: { color: '#705898', hex: '#705898' },
  steel: { color: '#B8B8D0', hex: '#B8B8D0' },
  fire: { color: '#F08030', hex: '#F08030' },
  water: { color: '#6890F0', hex: '#6890F0' },
  grass: { color: '#78C850', hex: '#78C850' },
  electric: { color: '#F8D030', hex: '#F8D030' },
  psychic: { color: '#F85888', hex: '#F85888' },
  ice: { color: '#98D8D8', hex: '#98D8D8' },
  dragon: { color: '#7038F8', hex: '#7038F8' },
  dark: { color: '#705848', hex: '#705848' },
  fairy: { color: '#EE99AC', hex: '#EE99AC' },
  unknown: { color: '#68A090', hex: '#68A090' },
  shadow: { color: '#705898', hex: '#705898' }
};

export function getPokcolor(type: string): string {
  return POKEMON_TYPE[type.toLowerCase()]?.color || POKEMON_TYPE['unknown'].color;
}

export function getBackground(pokemonTypes: { type: { name: string } }[]): string {
  let color = "";
  if (pokemonTypes.length) {
    const pokemontype1 = pokemonTypes[0].type.name;
    if (pokemonTypes.length > 1) {
      const pokemontype2 = pokemonTypes[1].type.name;
      color = `linear-gradient(180deg, ${getPokcolor(pokemontype1)} 0%, ${getPokcolor(pokemontype2)} 100%)`;
    } else {
      color = getPokcolor(pokemontype1);
    }
  }
  return color;
}

export function getPokemonDescription(data: { language: { name: string }, flavor_text: string }[] = []): string {
  if (data.length) {
    const uniqueTextArray: string[] = [];
    return data.reduce((acc, next) => {
      if (next.language.name === "en" && !uniqueTextArray.includes(next.flavor_text)) {
        uniqueTextArray.push(next.flavor_text);
        return acc += next.flavor_text.replace(/\n|\f/g, " ");
      }
      return acc;
    }, "");
  }
  return "";
}

export function getCamleCaseString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
} 