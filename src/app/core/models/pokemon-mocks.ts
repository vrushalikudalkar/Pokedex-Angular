import { Pokemon, PokemonAbility, PokemonSpecies, PokemonStat, PokemonType, EvolutionChain, PokemonData } from './pokemon.types';

export const mockPokemonType: PokemonType = {
  type: {
    name: 'grass',
    url: 'https://pokeapi.co/api/v2/type/12/'
  }
};

export const mockPokemonAbility: PokemonAbility = {
  ability: {
    name: 'overgrow',
    url: 'https://pokeapi.co/api/v2/ability/65/'
  },
  is_hidden: false,
  slot: 1
};

export const mockPokemonStat: PokemonStat = {
  base_stat: 45,
  effort: 0,
  stat: {
    name: 'speed',
    url: 'https://pokeapi.co/api/v2/stat/6/'
  }
};

export const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  types: [mockPokemonType],
  abilities: [mockPokemonAbility],
  stats: [mockPokemonStat],
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    other: {
      dream_world: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
      },
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
      }
    }
  },
  moves: [{ move: { name: 'tackle', url: 'https://pokeapi.co/api/v2/move/1/' } }]
};

export const mockPokemonSpecies: PokemonSpecies = {
  egg_groups: [{ name: 'monster', url: 'https://pokeapi.co/api/v2/egg-group/1/' }],
  flavor_text_entries: [{
    flavor_text: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
    language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' }
  }],
  evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/1/' },
  base_happiness: 70,
  capture_rate: 45,
  growth_rate: { name: 'medium-slow' }
};

export const mockEvolutionChain: EvolutionChain = {
    chain: {
      species: { name: 'bulbasaur', url: '' },
      evolves_to: []
    }
  };

export const mockPokemonSpeciesEmpty : PokemonSpecies = {
    egg_groups: [],
    flavor_text_entries: [],
    evolution_chain: {
        url: ''
    },
    base_happiness: 0,
    capture_rate: 0,
    growth_rate: {
        name: ''
    }
}

export const mockPokemonSpeciesUndefined : PokemonSpecies|null = null

export const mockPokemonListResponse = {
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/'
    }
  ]
};


export const mockPokemonList : PokemonData[] = [
    { name: "Pikachu", url: "https://your-api-url.com/pokemon/Pikachu" },
    { name: "Charmander", url: "https://your-api-url.com/pokemon/Charmander" }
  ]