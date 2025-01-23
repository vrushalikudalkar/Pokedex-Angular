import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../../core/models/pokemon.types';
import { getBackground } from '../../../core/constants/pokemon-types';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() data!: Pokemon;
  @Output() cardClick = new EventEmitter<void>();

  getCardBackground(): any {
    return getBackground(this.data.types);
  }

  getPokemonNumber(id: any): any {
    let result = id.toString();
    if (id < 10) result = `00${id}`;
    else if (id < 100) result = `0${id}`;
    return result;
  }

  getImageUrl(): string {
    return this.data.sprites.other?.['official-artwork']?.front_default ||
           this.data.sprites.other?.dream_world?.front_default ||
           this.data.sprites.front_default ||
           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
  }
} 