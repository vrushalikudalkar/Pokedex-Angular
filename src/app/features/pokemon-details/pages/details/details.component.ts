import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { PokemonService } from '../../../../core/services/pokemon.service';
import { Pokemon, PokemonSpecies } from '../../../../core/models/pokemon.types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  currentPokemonId!: number;
  isDetailLoading = true;
  data$!: Observable<{
    pokemon: Pokemon;
    species: PokemonSpecies;
    typeData: any;
  }>;
  maxPokemonId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private dialog: MatDialog
  ) {
    this.maxPokemonId = 0;
    this.pokemonService.pokemonList$.subscribe(list => {
      this.maxPokemonId = list.length;
    });
  }

  ngOnInit(): void {
    this.data$ = this.route.params.pipe(
      map(params => +params['id']),
      tap(id => {
        this.currentPokemonId = id;
        this.isDetailLoading = true;
      }),
      switchMap(id => forkJoin({
        pokemon: this.pokemonService.getPokemonDataById(id),
        species: this.pokemonService.getSpeciesDataById(id),
        typeData: this.pokemonService.getPokemonTypesById(id)
      })),
      tap(() => this.isDetailLoading = false)
    );
  }

  handleForwardClick(): void {
    if (this.currentPokemonId === this.maxPokemonId) return;
    this.router.navigate(['/details', this.currentPokemonId + 1]);
  }

  handleBackwardClick(): void {
    if (this.currentPokemonId === 1) return;
    this.router.navigate(['/details', this.currentPokemonId - 1]);
  }

  handleClose(): void {
    this.router.navigate(['/']);
  }
} 