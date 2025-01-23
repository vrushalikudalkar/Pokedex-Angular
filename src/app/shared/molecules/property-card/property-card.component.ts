import { Component, Input } from '@angular/core';
import { getCamleCaseString } from '../../../core/constants/pokemon-types';
import { Pokemon } from '../../../core/models/pokemon.types';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent {
  @Input() pokemon!: any;
  @Input() speciesData: any;
  @Input() pokemonTypeData: any;

  getCamleCaseString = getCamleCaseString;

  getEggGroups(): any {
    return this.speciesData?.egg_groups
      .map((item: any) => this.getCamleCaseString(item.name))
      .join(', ');
  }

  getBaseStats(): any {
    return this.pokemon?.stats
      .map((stat: any) => `${this.getCamleCaseString(stat.stat.name)}: ${stat.base_stat}`)
      .join(', ');
  }

  getMoves(): any {
    return this.pokemon?.moves
      .slice(0, 5) // Limit to first 5 moves for brevity
      .map((move: any) => this.getCamleCaseString(move.move.name))
      .join(', ');
  }

  getAbilities(): any {
    return this.pokemon?.abilities
      .map((item: any) => this.getCamleCaseString(item.ability.name))
      .join(', ');
  }
} 