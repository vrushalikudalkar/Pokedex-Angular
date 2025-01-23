import { Component, Input } from '@angular/core';
import { getCamleCaseString } from '../../../core/constants/pokemon-types';
import { PokemonStat } from '../../../core/models/pokemon.types';


@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent {
  @Input() stats!: any;

  getStatHeading(name: any): any {
    if (name === 'hp') {
      return 'HP';
    }
    
    const [firstName, lastName] = name.split('-');
    if (firstName === 'special' && lastName) {
      return 'Sp. ' + getCamleCaseString(lastName);
    }
    return getCamleCaseString(firstName);
  }
} 