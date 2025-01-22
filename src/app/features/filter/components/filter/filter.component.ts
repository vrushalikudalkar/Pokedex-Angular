import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable,  Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  @Output() filterEnabled = new EventEmitter<boolean>();

  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  isTypeFilterOpen = false;
  isGenderFilterOpen = false;
  
  pokemonTypes$: Observable<any[]> = this.pokemonService.getPokemonTypes().pipe(
    map(response => this.pokemonService.transformTypeData(response.results))
  );
  
  pokemonGenders$: Observable<any[]> = this.pokemonService.getPokemonGenders().pipe(
    map(response => this.pokemonService.transformGenderData(response.results))
  );

  isFilterEnabled = false;
  SEARCH_SLICED = 20;

  constructor(private pokemonService: PokemonService) {
    // Setup the debounced search
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  ngOnInit(): void {
    // Get all pokemon list at initialization
    this.pokemonService.getAllPokemonDataList().subscribe(
      (data: any) => {
        this.pokemonService.allPokemonsList = data.results;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchSubject.next(value); // Emit the search term to the subject
  }

  private performSearch(value: string): void {
    if (value.length) {
      this.isFilterEnabled = true;
      this.filterEnabled.emit(true);
      
      // Filter the allPokemonsList
      const filteredList = this.pokemonService.allPokemonsList.filter(pokemon => 
        pokemon.name.toLowerCase().includes(value)
      );

      if (filteredList.length > this.SEARCH_SLICED) {
        filteredList.length = this.SEARCH_SLICED;
      }

      // Get detailed data for filtered pokemon
      this.pokemonService.getPokemonDetailsListByUrl(filteredList)
        .subscribe(detailedList => {
          this.pokemonService.setFilteredPokemonList(detailedList);
        });
    } else {
      this.filterEnabled.emit(false);
      this.pokemonService.setFilteredPokemonList([]);
      this.pokemonService.getPokemonData(true).subscribe();
    }
  }

  onTypeChange(values: string[]): void {
    if (values.length) {
      this.filterEnabled.emit(true);
      this.pokemonService.filterByTypes(values);
    } else {
      this.filterEnabled.emit(false);
      this.pokemonService.getPokemonData(true).subscribe();
    }
  }

  onGenderChange(values: string[]): void {
    if (values.length) {
      this.filterEnabled.emit(true);
      this.pokemonService.filterByGenders(values);
    } else {
      this.filterEnabled.emit(false);
      this.pokemonService.getPokemonData(true).subscribe();
    }
  }

  onTypeFilterOpen(): void {
    this.isTypeFilterOpen = true;
  }

  onTypeFilterClose(): void {
    this.isTypeFilterOpen = false;
  }

  onGenderFilterOpen(): void {
    this.isGenderFilterOpen = true;
  }

  onGenderFilterClose(): void {
    this.isGenderFilterOpen = false;
  }
} 