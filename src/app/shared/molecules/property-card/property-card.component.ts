import { Component, Input } from '@angular/core';
import { getCamleCaseString } from '../../../core/constants/pokemon-types';
import { Pokemon, PokemonSpecies } from 'src/app/core/models/pokemon.types';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent {
  @Input() pokemon!: Pokemon;
  @Input() speciesData!: PokemonSpecies |null;

  getCamleCaseString = getCamleCaseString;

  getBaseStats(): string {
    return this.pokemon?.stats
      .map((stat) => `${this.getCamleCaseString(stat.stat.name)}: ${stat.base_stat}`)
      .join(', ');
  }

  getMoves(): string {
    return this.pokemon?.moves
      .slice(0, 5) // Limit to first 5 moves for brevity
      .map((move) => this.getCamleCaseString(move.move.name))
      .join(', ');
  }

  getAbilities(): string {
    return this.pokemon?.abilities
      .map((item) => this.getCamleCaseString(item.ability.name))
      .join(', ');
  }

  getBaseHappiness(): number {
    return this.speciesData?.base_happiness || 0;
  }

  getCaptureRate(): number {
    return this.speciesData?.capture_rate || 0;
  }

  getEggGroups(): string {
    return this.speciesData?.egg_groups
      .map((group) => this.getCamleCaseString(group.name))
      .join(', ') || 'Unknown';
  }

  getGrowthRate(): string {
    return this.speciesData?.growth_rate?.name
      ? this.getCamleCaseString(this.speciesData.growth_rate.name)
      : 'Unknown';
  }
} 