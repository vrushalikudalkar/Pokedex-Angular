import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { API_URLS } from '../constants/api-urls';
import { getCamleCaseString } from '../constants/pokemon-types';
import { EvolutionChain, PokemonSpecies, Pokemon } from '../models/pokemon.types';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private initialURL = `${API_URLS.baseURL}/pokemon?limit=${API_URLS.LIMIT}`;
  private allPokemonURL = `${API_URLS.baseURL}/pokemon?limit=1100`;
  
  private pokemonListSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private loadMoreInProgressSubject = new BehaviorSubject<boolean>(false);
  private filteredPokemonList = new BehaviorSubject<any[]>([]);

  pokemonList$ = this.pokemonListSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  loadMoreInProgress$ = this.loadMoreInProgressSubject.asObservable();
  filteredPokemonList$ = this.filteredPokemonList.asObservable();

  private nextUrl: string = this.initialURL;

  allPokemonsList: any[] = [];

  constructor(private http: HttpClient) {}

  getPokemonData(isReset: boolean = false): Observable<any> {
    if (isReset) {
      this.nextUrl = this.initialURL;
      this.pokemonListSubject.next([]);
    }
    
    if (!this.nextUrl) {
      return of([]);
    }

    this.loadMoreInProgressSubject.next(true);
    
    return this.http.get(this.nextUrl).pipe(
      switchMap((response: any) => {
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

  getPokemonDetailsListByUrl(results: any[]): Observable<any[]> {
    if (!results?.length) {
      return of([]);
    }
    
    const observables = results.map(pokemon => 
      this.http.get<any>(pokemon.url).pipe(
        catchError(error => {
          console.error(`Error fetching pokemon ${pokemon.name}:`, error);
          return of(null);
        })
      )
    );
    
    return forkJoin(observables).pipe(
      map(pokemons => pokemons.filter(pokemon => pokemon !== null))
    );
  }

  getAllPokemonDataList(): Observable<any> {
    return this.http.get(this.allPokemonURL);
  }

  getSpeciesDataById(id: number): Observable<any> {
    return this.http.get(`${API_URLS.baseURL}/pokemon-species/${id}/`);
  }

  getPokemonTypesById(id: number): Observable<any> {
    return this.http.get(`${API_URLS.baseURL}/type/${id}/`);
  }

  getPokemonTypes(): Observable<any> {
    return this.http.get(`${API_URLS.baseURL}/type`);
  }

  getPokemonDataById(id: number): Observable<any> {
    return this.http.get(`${API_URLS.baseURL}/pokemon/${id}/`);
  }

  numberFormation(number: number): string {
    let result = number.toString();
    if (number < 10) result = `00${number}`;
    if (number > 10 && number < 100) result = `0${number}`;
    return result;
  }

  getAllParallelCall(ApiUrls: string[]): Observable<any[]> {
    const observables = ApiUrls.map(url => this.http.get(url));
    return forkJoin(observables);
  }
  removeDuplicateBy(arr: any[], prop: string): any[] {
    return Array.from(new Map(arr.map((m) => [m[prop], m])).values());
  }

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  filterBySearch(searchTerm: string): any {
    if (!searchTerm.trim()) {
      this.filteredPokemonList.next([]);
      return;
    }

    const filtered = this.allPokemonsList
      .filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filtered.length > API_URLS.SEARCH_SLICED) {
      filtered.length = API_URLS.SEARCH_SLICED;
    }

    this.getPokemonDetailsListByUrl(filtered)
      .subscribe(pokemonList => {
        this.filteredPokemonList.next(pokemonList);
      });
  }

  filterByTypes(typeUrls: string[]): Observable<any[]> {
    if (!typeUrls.length) {
      this.filteredPokemonList.next([]);
      return of([]);
    }

    this.setLoading(true);

    return this.getAllParallelCall(typeUrls).pipe(
      map(responses => {
        let pokemonList = responses
          .map(res => res.pokemon)
          .flat()
          .map(item => item.pokemon);
        pokemonList = this.removeDuplicateBy(pokemonList, 'name');
        return pokemonList;
      }),
      switchMap(pokemonList => this.getPokemonDetailsListByUrl(pokemonList)),
      tap(pokemonList => {
        this.setFilteredPokemonList(pokemonList);
        this.setLoading(false);
      }),
      catchError(error => {
        console.error('Error filtering by types:', error);
        this.setLoading(false);
        return of([]);
      })
    );
  }

  transformTypeData(types: any[]): any[] {
    return types.map(item => ({
      label: getCamleCaseString(item.name),
      value: item.url,
      url: item.url
    }));
  }

  getEvolutionChain(url: string): Observable<EvolutionChain> {
    return this.http.get<EvolutionChain>(url).pipe(
      catchError(error => {
        console.error('Error fetching evolution chain:', error);
        return of({ chain: { species: { name: '', url: '' }, evolves_to: [] } });
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

  private extractEvolutionChain(chain: EvolutionChain): string[] {
    const pokemonNames: string[] = [];
    
    const extractNames = (node: any) => {
      if (node.species) {
        pokemonNames.push(node.species.name);
      }
      if (node.evolves_to && node.evolves_to.length > 0) {
        node.evolves_to.forEach((evolution: any) => {
          extractNames(evolution);
        });
      }
    };

    extractNames(chain.chain);
    return pokemonNames;
  }

  setFilteredPokemonList(data: any[]): void {
    this.filteredPokemonList.next(data);
  }
} 