import { Component, Input } from '@angular/core';
import { getPokcolor } from '../../../core/constants/pokemon-types';

@Component({
  selector: 'app-colorful-tag',
  templateUrl: './colorful-tag.component.html',
  styleUrls: ['./colorful-tag.component.scss']
})
export class ColorfulTagComponent {
  @Input() text = '';
  @Input() className = '';
  @Input() type: string = '';

  getPokemonColor = getPokcolor;
} 