import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../../core/models/pokemon.types';
import { getCamleCaseString } from '../../../../core/constants/pokemon-types';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent {
  @Input() pokemon!: Pokemon;
  @Input() speciesData: any;
  @Input() pokemonTypeData: any;

  getCamleCaseString = getCamleCaseString;

  getEggGroups(): string {
    return this.speciesData?.egg_groups
      .map((item: any) => this.getCamleCaseString(item.name))
      .join(', ');
  }

  getAbilities(): string {
    return this.pokemon?.abilities
      .map((item: any) => this.getCamleCaseString(item.ability.name))
      .join(', ');
  }
} 