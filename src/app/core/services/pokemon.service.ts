import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { API_URLS } from '../constants/api-urls';
import { EvolutionChain, PokemonSpecies, Pokemon } from '../models/pokemon.types';

export interface PokemonListResponse {
  next: string;
  results: { name: string; url: string; }[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private initialURL = `${API_URLS.baseURL}/pokemon?limit=${API_URLS.LIMIT}`;
  private allPokemonURL = `${API_URLS.baseURL}/pokemon?limit=1100`;
  
  private pokemonListSubject = new BehaviorSubject<Pokemon[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private loadMoreInProgressSubject = new BehaviorSubject<boolean>(false);
  filteredPokemonList = new BehaviorSubject<Pokemon[]>([]);

  pokemonList$ = this.pokemonListSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  loadMoreInProgress$ = this.loadMoreInProgressSubject.asObservable();
  filteredPokemonList$ = this.filteredPokemonList.asObservable();

  private nextUrl: string = this.initialURL;

  allPokemonsList: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  getPokemonData(isReset = false): Observable<Pokemon[]> {
    if (isReset) {
      this.nextUrl = this.initialURL;
      this.pokemonListSubject.next([]);
    }
    
    if (!this.nextUrl) {
      return of([]);
    }

    this.loadMoreInProgressSubject.next(true);
    
    return this.http.get<PokemonListResponse>(this.nextUrl).pipe(
      switchMap((response) => {
        this.nextUrl = response.next;
        return this.getPokemonDetailsListByUrl(response.results);
      }),
      tap(pokemonsList => {
        const currentList = isReset ? [] : this.pokemonListSubject.value;
        this.pokemonListSubject.next([...currentList, ...pokemonsList]);
        this.loadMoreInProgressSubject.next(false);
      })
    );
  }

  getPokemonDetailsListByUrl(results: { name: string; url: string; }[]): Observable<Pokemon[]> {
    if (!results?.length) {
      return of([]);
    }
    
    const observables = results.map(pokemon => 
      this.http.get<Pokemon>(pokemon.url).pipe(
        catchError(error => {
          console.error(`Error fetching pokemon ${pokemon.name}:`, error);
          return of(null);
        })
      )
    );
    
    return forkJoin(observables).pipe(
      map(pokemons => pokemons.filter((pokemon): pokemon is Pokemon => pokemon !== null))
    );
  }

  getAllPokemonDataList(): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(this.allPokemonURL);
  }

  getSpeciesDataById(id: number): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(`${API_URLS.baseURL}/pokemon-species/${id}/`);
  }

  getPokemonDataById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${API_URLS.baseURL}/pokemon/${id}/`);
  }

  numberFormation(number: number): string {
    let result = number.toString();
    if (number < 10) result = `00${number}`;
    if (number > 10 && number < 100) result = `0${number}`;
    return result;
  }

  getAllParallelCall(ApiUrls: string[]): Observable<unknown[]> {
    const observables = ApiUrls.map(url => this.http.get(url));
    return forkJoin(observables);
  }

  removeDuplicateBy<T>(arr: T[], prop: keyof T): T[] {
    return Array.from(new Map(arr.map((m) => [m[prop], m])).values());
  }

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  filterBySearch(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredPokemonList.next([]);
      return;
    }

    const filtered = this.allPokemonsList
      .filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(pokemon => ({
        name: pokemon.name,
        url: `${API_URLS.baseURL}/pokemon/${pokemon.name}`
      }));

    if (filtered.length > API_URLS.SEARCH_SLICED) {
      filtered.length = API_URLS.SEARCH_SLICED;
    }

    this.getPokemonDetailsListByUrl(filtered)
      .subscribe(pokemonList => {
        this.filteredPokemonList.next(pokemonList);
      });
  }

  getEvolutionChain(url: string): Observable<EvolutionChain> {
    const emptyChain: EvolutionChain = {
      chain: {
        species: { name: '', url: '' },
        evolves_to: []
      }
    };
    
    return this.http.get<EvolutionChain>(url).pipe(
      catchError(error => {
        console.error('Error fetching evolution chain:', error);
        return of(emptyChain);
      })
    );
  }

  getPokemonEvolutionChain(speciesData: PokemonSpecies): Observable<Pokemon[]> {
    return this.getEvolutionChain(speciesData.evolution_chain.url).pipe(
      map(chain => this.extractEvolutionChain(chain)),
      switchMap(pokemonNames => {
        const pokemonRequests = pokemonNames.map(name => 
          this.http.get<Pokemon>(`${API_URLS.baseURL}/pokemon/${name}`)
        );
        return forkJoin(pokemonRequests);
      }),
      catchError(error => {
        console.error('Error fetching pokemon evolution chain:', error);
        return of([]);
      })
    );
  }

  extractEvolutionChain(chain: EvolutionChain): string[] {
    const pokemonNames: string[] = [];
    
    const extractNames = (node: EvolutionChain['chain']) => {
      if (node.species) {
        pokemonNames.push(node.species.name);
      }
      if (node.evolves_to && node.evolves_to.length > 0) {
        node.evolves_to.forEach(evolution => {
          extractNames(evolution);
        });
      }
    };

    extractNames(chain.chain);
    return pokemonNames;
  }

  setFilteredPokemonList(data: Pokemon[]): void {
    this.filteredPokemonList.next(data);
  }
} 