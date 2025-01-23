import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared.module';


import { PokemonDetailsComponent } from './pokemon-details.component';
import { ColorfulTagComponent } from '../../atoms/colorful-tag/colorful-tag.component';
import { EvolutionChainCardComponent } from '../../molecules/evolution-chain-card/evolution-chain-card.component';
import { PropertyCardComponent } from '../../molecules/property-card/property-card.component';
import { StatCardComponent } from '../../molecules/stat-card/stat-card.component';
import { DetailsHeaderComponent } from '../../organisms/details-header/details-header.component';


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