import { Component, Input, Output, EventEmitter } from '@angular/core';
import { getPokemonDescription } from '../../../core/constants/pokemon-types';
import { Pokemon } from '../../../core/models/pokemon.types';


@Component({
  selector: 'app-details-header',
  templateUrl: './details-header.component.html',
  styleUrls: ['./details-header.component.scss']
})
export class DetailsHeaderComponent {
  @Input() pokemon!: any;
  @Input() speciesData: any;
  @Output() backClick = new EventEmitter<void>();
  @Output() closeClick = new EventEmitter<void>();
  @Output() forwardClick = new EventEmitter<void>();

  readonly MAX_DESCRIPTION_LENGTH = 363;

  getPokemonDescription(): any {
    if (this.speciesData?.flavor_text_entries) {
      return getPokemonDescription(this.speciesData.flavor_text_entries);
    }
    return '';
  }

  getDescription(): { text: any, hasMore: any } {
    const fullDescription = this.getPokemonDescription();
    return {
      text: fullDescription.substring(0, this.MAX_DESCRIPTION_LENGTH),
      hasMore: fullDescription.length > this.MAX_DESCRIPTION_LENGTH
    };
  }
} 