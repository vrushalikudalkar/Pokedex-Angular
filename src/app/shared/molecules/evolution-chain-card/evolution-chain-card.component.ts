import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../core/models/pokemon.types';

@Component({
  selector: 'app-evolution-chain-card',
  templateUrl: './evolution-chain-card.component.html',
  styleUrls: ['./evolution-chain-card.component.scss']
})
export class EvolutionChainCardComponent {
  @Input() evolutionChain!: Pokemon[];
} 