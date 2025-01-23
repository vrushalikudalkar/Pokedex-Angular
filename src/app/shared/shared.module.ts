import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PokemonCardComponent } from './molecules/pokemon-card/pokemon-card.component';
import { HeaderComponent } from './organisms/header/header.component';
import { LoaderComponent } from './atoms/loader/loader.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    PokemonCardComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    HeaderComponent,
    LoaderComponent,
    PokemonCardComponent
  ]
})
export class SharedModule { } 