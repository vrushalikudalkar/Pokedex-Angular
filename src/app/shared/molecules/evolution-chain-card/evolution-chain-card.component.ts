import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-evolution-chain-card',
  templateUrl: './evolution-chain-card.component.html',
  styleUrls: ['./evolution-chain-card.component.scss']
})
export class EvolutionChainCardComponent {
  @Input() evolutionChain!:any;
} 