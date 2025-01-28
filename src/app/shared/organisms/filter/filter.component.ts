import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { PokemonService } from '../../../core/services/pokemon.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  @Output() filterEnabled = new EventEmitter<any>();

  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  isTypeFilterOpen = false;
  
  pokemonTypes$: Observable<any> = this.pokemonService.getPokemonTypes().pipe(
    map(response => this.pokemonService.transformTypeData(response.results))
  );

  isFilterEnabled = false;
  SEARCH_SLICED = 20;

  private dropdownFilteredList: any[] = [];
  private originalList: any[] = [];
  private displayedList: any[] = [];
  private isFilterActive: boolean = false;

  constructor(private pokemonService: PokemonService) {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  ngOnInit(): void {
    this.pokemonService.getAllPokemonDataList().subscribe(
      (data: any) => {
        this.originalList = data.results;
        this.dropdownFilteredList = [...this.originalList];
        this.displayedList = this.dropdownFilteredList.slice(0, this.SEARCH_SLICED);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onSearchChange(value: string): void {
    const trimmedValue = value.trim().toLowerCase();
    this.searchSubject.next(trimmedValue);
  }

  private performSearch(value: string): void {
    this.pokemonService.setLoading(true);
    if (value.length) {
      this.isFilterEnabled = true;
      this.filterEnabled.emit(true);
      
      const baseList = this.isFilterActive ? this.dropdownFilteredList : this.originalList;
      
      const filteredList = baseList.filter(pokemon => {
        if (pokemon && pokemon.name) {
          return pokemon.name.toLowerCase().includes(value);
        }
        return false;
      });

      this.displayedList = filteredList.slice(0, this.SEARCH_SLICED);

      this.pokemonService.setFilteredPokemonList(this.displayedList);
      this.pokemonService.setLoading(false);
    } else {
      this.displayedList = this.dropdownFilteredList.slice(0, this.SEARCH_SLICED);
      this.pokemonService.setFilteredPokemonList(this.displayedList);
      this.pokemonService.setLoading(false);
    }
  }

  onTypeChange(values: any[]): void {
    this.pokemonService.setLoading(true);
    if (values.length) {
      this.isFilterActive = true;
      this.filterEnabled.emit(true);
      this.pokemonService.filterByTypes(values).subscribe(filteredList => {
        this.dropdownFilteredList = filteredList;
        this.displayedList = this.dropdownFilteredList.slice(0, this.SEARCH_SLICED);
        this.pokemonService.setFilteredPokemonList(this.displayedList);
        this.pokemonService.setLoading(false);
      });
    } else {
      this.isFilterActive = false;
      this.filterEnabled.emit(false);
      this.dropdownFilteredList = [...this.originalList];
      this.displayedList = this.dropdownFilteredList.slice(0, this.SEARCH_SLICED);
      this.pokemonService.setFilteredPokemonList(this.displayedList);
      this.pokemonService.setLoading(false);
    }
  }

  loadMore(): void {
    const currentLength = this.displayedList.length;
    const additionalItems = this.dropdownFilteredList.slice(currentLength, currentLength + this.SEARCH_SLICED);
    this.displayedList = this.displayedList.concat(additionalItems);
    this.pokemonService.setFilteredPokemonList(this.displayedList);
  }

  onTypeFilterOpen(): void {
    this.isTypeFilterOpen = true;
  }

  onTypeFilterClose(): void {
    this.isTypeFilterOpen = false;
  }
} 