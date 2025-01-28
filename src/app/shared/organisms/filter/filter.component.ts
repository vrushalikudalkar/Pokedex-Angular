import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable,  Subject, Subscription } from 'rxjs';
import { PokemonService } from '../../../core/services/pokemon.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  @Output() filterEnabled = new EventEmitter<any>();

  private searchSubject = new Subject<any>();
  private searchSubscription: Subscription;

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

  onSearchChange(value: any): void {
    const trimmedValue = value.trim().toLowerCase();
    this.searchSubject.next(trimmedValue); // Emit the search term to the subject
  }

  private performSearch(value: any): void {
    this.pokemonService.setLoading(true); // Set loading to true when search starts
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
          this.pokemonService.setLoading(false); // Set loading to false after data is fetched
        });
    } else {
      this.filterEnabled.emit(false);
      this.pokemonService.setFilteredPokemonList([]);
      this.pokemonService.getPokemonData(true).subscribe(() => {
        this.pokemonService.setLoading(false); // Set loading to false after data is fetched
      });
    }
  }
} 