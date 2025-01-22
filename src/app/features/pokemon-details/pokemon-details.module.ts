import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared/shared.module';

import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { DetailsHeaderComponent } from './components/details-header/details-header.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { EvolutionChainCardComponent } from './components/evolution-chain-card/evolution-chain-card.component';
import { ColorfulTagComponent } from './components/colorful-tag/colorful-tag.component';

const routes: Routes = [
  {
    path: ':id',
    component: PokemonDetailsComponent
  }
];

@NgModule({
  declarations: [
    PokemonDetailsComponent,
    DetailsHeaderComponent,
    PropertyCardComponent,
    StatCardComponent,
    EvolutionChainCardComponent,
    ColorfulTagComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ]
})
export class PokemonDetailsModule { } 