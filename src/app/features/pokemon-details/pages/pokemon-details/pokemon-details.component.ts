import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, tap, takeUntil, finalize } from 'rxjs/operators';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { Pokemon, PokemonSpecies } from '../../../../core/models/pokemon.types';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {
  pokemon$: Observable<Pokemon> = of();
  species$: Observable<PokemonSpecies> = of();
  evolutionChain$: Observable<Pokemon[]> = of([]);
  isLoading = true;
  currentId = 1;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.currentId = +params['id'];
      this.loadPokemonData();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadPokemonData(): void {
    this.isLoading = true;

    this.pokemon$ = this.pokemonService.getPokemonDataById(this.currentId).pipe(
      tap(() => {
        this.isLoading = false;
      }),
      takeUntil(this.destroy$)
    );

    this.species$ = this.pokemon$.pipe(
      switchMap(pokemon => this.pokemonService.getSpeciesDataById(pokemon.id)),
      takeUntil(this.destroy$)
    );

    this.evolutionChain$ = this.species$.pipe(
      switchMap(species => this.pokemonService.getPokemonEvolutionChain(species)),
      takeUntil(this.destroy$)
    );
  }

  onPreviousPokemon(): void {
    if (this.currentId > 1) {
      this.router.navigate(['/details', this.currentId - 1]);
    }
  }

  onNextPokemon(): void {
    this.router.navigate(['/details', this.currentId + 1]);
  }

  onClose(): void {
    this.router.navigate(['/']);
  }
} 