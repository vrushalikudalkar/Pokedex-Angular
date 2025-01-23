import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonService } from '../../../core/services/pokemon.service';
import { Pokemon } from '../../../core/models/pokemon.types';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isFilterEnabled = false;
  pokemonList$: Observable<Pokemon[]>;
  filteredList$: Observable<Pokemon[]>;
  isLoading$: Observable<boolean>;
  isLoadMoreInProgress$: Observable<boolean>;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {
    this.pokemonList$ = this.pokemonService.pokemonList$;
    this.filteredList$ = this.pokemonService.filteredPokemonList$;
    this.isLoading$ = this.pokemonService.loading$;
    this.isLoadMoreInProgress$ = this.pokemonService.loadMoreInProgress$;
  }

  ngOnInit(): void {
    // Set loading to true before fetching data
    this.pokemonService.setLoading(true);
    this.pokemonService.getPokemonData(true).subscribe({
      next: () => this.pokemonService.setLoading(false),
      error: (error) => {
        console.error('Error loading Pokemon:', error);
        this.pokemonService.setLoading(false);
      }
    });
  }

  handlePokemonClick(id: number): void {
    this.router.navigate(['/details', id]);
  }

  handleLoadMore(): void {
    this.pokemonService.getPokemonData().subscribe();
  }

  onFilterEnabled(enabled: boolean): void {
    this.isFilterEnabled = enabled;
  }

  getDisplayList(): Observable<Pokemon[]> {
    return this.isFilterEnabled ? this.filteredList$ : this.pokemonList$;
  }
} 