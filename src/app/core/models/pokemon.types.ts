export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    }
  }[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
      'official-artwork': {
        front_default: string;
      };
    };
  };
  moves:[{
    move:{name:string,url:string}
  }]
}

export interface PokemonSpecies {
  egg_groups: {
    name: string;
    url: string;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionChain {
  chain: {
    species: {
      name: string;
      url: string;
    };
    evolves_to: Array<{
      species: {
        name: string;
        url: string;
      };
      evolves_to: Array<{
        species: {
          name: string;
          url: string;
        };
      }>;
    }>;
  };
} 