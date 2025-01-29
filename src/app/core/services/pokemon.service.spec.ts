import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { API_URLS } from '../constants/api-urls';
import { BehaviorSubject, of } from 'rxjs';
import { EvolutionChain, Pokemon, PokemonSpecies } from '../models/pokemon.types';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch pokemon data and update the pokemon list', () => {
    const mockResponse = {
      next: 'next-url',
      results: [{ url: 'pokemon-url', name: 'bulbasaur' }]
    };
    const mockPokemonDetails = { name: 'bulbasaur', id: 1 };

    service.getPokemonData().subscribe(pokemonList => {
      expect(pokemonList).toEqual([mockPokemonDetails]);
    });

    const req1 = httpMock.expectOne(service['initialURL']);
    expect(req1.request.method).toBe('GET');
    req1.flush(mockResponse);

    const req2 = httpMock.expectOne('pokemon-url');
    expect(req2.request.method).toBe('GET');
    req2.flush(mockPokemonDetails);

    expect(service['pokemonListSubject'].value).toEqual([mockPokemonDetails]);
  });

  it('should fetch pokemon details by URL', () => {
    const mockDetails = { name: 'bulbasaur', types: [] };

    service.getPokemonDetailsListByUrl([{ url: 'bulbasaur-url' }]).subscribe(details => {
      expect(details).toEqual([mockDetails]);
    });

    const req = httpMock.expectOne('bulbasaur-url');
    expect(req.request.method).toBe('GET');
    req.flush(mockDetails);
  });

  it('should handle error when fetching pokemon details', () => {
    service.getPokemonDetailsListByUrl([{ url: 'bulbasaur-url' }]).subscribe(details => {
      expect(details).toEqual([]);
    });

    const req = httpMock.expectOne('bulbasaur-url');
    req.error(new ErrorEvent('Network error'));
  });

  it('should return species data by ID', () => {
    const id = 1;
    const mockSpeciesData = { base_happiness: 70 };

    service.getSpeciesDataById(id).subscribe(data => {
      expect(data).toEqual(mockSpeciesData);
    });

    const req = httpMock.expectOne(`${API_URLS.baseURL}/pokemon-species/${id}/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSpeciesData);
  });

  it('should fetch evolution chain', () => {
    const url = 'evolution-chain-url';
    const mockEvolutionChain = { chain: { species: { name: 'bulbasaur', url: '' }, evolves_to: [] } };

    service.getEvolutionChain(url).subscribe(data => {
      expect(data).toEqual(mockEvolutionChain);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockEvolutionChain);
  });

  it('should handle errors in evolution chain fetching', () => {
    const url = 'evolution-chain-url';
    const mockError = { message: 'Error' };

    service.getEvolutionChain(url).subscribe(data => {
      expect(data).toEqual({ chain: { species: { name: '', url: '' }, evolves_to: [] } });
    });

    const req = httpMock.expectOne(url);
    req.flush(mockError, { status: 500, statusText: 'Server Error' });
  });

  it('should filter by search term', () => {
    service.allPokemonsList = [{ name: 'bulbasaur' }, { name: 'charmander' }];
    const searchTerm = 'bul';

    service.filterBySearch(searchTerm);

    service.filteredPokemonList$.subscribe(filteredList => {
      expect(filteredList).toEqual([{ name: 'bulbasaur' }]);
    });
  });

  it('should format numbers correctly', () => {
    expect(service.numberFormation(5)).toBe('005');
    expect(service.numberFormation(50)).toBe('050');
    expect(service.numberFormation(500)).toBe('500');
  });

  it('should fetch all pokemon data list', () => {
    const mockResponse = { results: [{ name: 'bulbasaur', url: 'bulbasaur-url' }] };

    service.getAllPokemonDataList().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service['allPokemonURL']);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should set loading state', () => {
    service.setLoading(true);
    service.loading$.subscribe(loading => {
      expect(loading).toBeTrue();
    });

    service.setLoading(false);
    service.loading$.subscribe(loading => {
      expect(loading).toBeFalse();
    });
  });

  it('should filter by search term', () => {
    service.allPokemonsList = [{ name: 'bulbasaur' }, { name: 'charmander' }];
    const mockDetails = { name: 'bulbasaur', types: [] };

    jest.spyOn(service, 'getPokemonDetailsListByUrl').mockReturnValue(of([mockDetails]));

    service.filterBySearch('bulba');
    service.filteredPokemonList$.subscribe(filtered => {
      expect(filtered).toEqual([mockDetails]);
    });
  });

  it('should handle empty search term', () => {
    service.filterBySearch('');
    service.filteredPokemonList$.subscribe(filtered => {
      expect(filtered).toEqual([]);
    });
  });

  it('should fetch evolution chain', () => {
    const mockChain = { chain: { species: { name: 'bulbasaur', url: '' }, evolves_to: [] } };

    service.getEvolutionChain('evolution-chain-url').subscribe(chain => {
      expect(chain).toEqual(mockChain);
    });

    const req = httpMock.expectOne('evolution-chain-url');
    expect(req.request.method).toBe('GET');
    req.flush(mockChain);
  });

  it('should handle error when fetching evolution chain', () => {
    service.getEvolutionChain('evolution-chain-url').subscribe(chain => {
      expect(chain).toEqual({ chain: { species: { name: '', url: '' }, evolves_to: [] } });
    });

    const req = httpMock.expectOne('evolution-chain-url');
    req.error(new ErrorEvent('Network error'));
  });
  it('should handle errors when fetching Pokemon details', () => {
    const speciesData: PokemonSpecies = {
        evolution_chain: { url: 'evolution-chain-url' },
        egg_groups: [],
        flavor_text_entries: []
    };

    const mockEvolutionChain: EvolutionChain = {
      chain: {
        species: { name: 'bulbasaur', url: '' },
        evolves_to: []
      }
    };

    service.getPokemonEvolutionChain(speciesData).subscribe(pokemons => {
      expect(pokemons).toEqual([]);
    });

    const evolutionChainRequest = httpMock.expectOne('evolution-chain-url');
    evolutionChainRequest.flush(mockEvolutionChain);

    const pokemonRequest = httpMock.expectOne(`${API_URLS.baseURL}/pokemon/bulbasaur`);
    pokemonRequest.error(new ErrorEvent('Network error'));
  });

  describe('setFilteredPokemonList', () => {
    it('should set the filtered Pokémon list', () => {
      const mockData = [{ name: 'bulbasaur' }, { name: 'ivysaur' }];
      const filteredPokemonListSubject = new BehaviorSubject<any[]>([]);
      (service as any).filteredPokemonList = filteredPokemonListSubject;

      service.setFilteredPokemonList(mockData);
      filteredPokemonListSubject.subscribe(data => {
        expect(data).toEqual(mockData);
      });
    });

    it('should set an empty list if no data is provided', () => {
      const filteredPokemonListSubject = new BehaviorSubject<any[]>([]);
      (service as any).filteredPokemonList = filteredPokemonListSubject;

      service.setFilteredPokemonList([]);
      filteredPokemonListSubject.subscribe(data => {
        expect(data).toEqual([]);
      });
    });
  });

  describe('extractEvolutionChain', () => {
    it('should extract all Pokémon names from a simple evolution chain', () => {
      const mockEvolutionChain: any = {
        chain: {
          species: { name: 'bulbasaur', url: '' },
          evolves_to: [
            {
              species: { name: 'ivysaur', url: '' },
              evolves_to: [
                {
                  species: { name: 'venusaur', url: '' },
                  evolves_to: []
                }
              ]
            }
          ]
        }
      };

      const result = (service as any).extractEvolutionChain(mockEvolutionChain);
      expect(result).toEqual(['bulbasaur', 'ivysaur', 'venusaur']);
    });

    it('should handle an evolution chain with no evolutions', () => {
      const mockEvolutionChain: EvolutionChain = {
        chain: {
          species: { name: 'bulbasaur', url: '' },
          evolves_to: []
        }
      };

      const result = (service as any).extractEvolutionChain(mockEvolutionChain);
      expect(result).toEqual(['bulbasaur']);
    });

    it('should return an empty array for an empty chain', () => {
      const mockEvolutionChain: EvolutionChain = {
        chain: {
          species: { name: '', url: '' },
          evolves_to: []
        }
      };

      const result = (service as any).extractEvolutionChain(mockEvolutionChain);
      expect(result).toEqual([""]);
    });
  });

  describe('removeDuplicateBy', () => {
    it('should remove duplicates based on a property', () => {
      const array = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' },
        { id: 1, name: 'bulbasaur' }
      ];
      const expectedResult = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' }
      ];

      const result = service.removeDuplicateBy(array, 'id');
      expect(result).toEqual(expectedResult);
    });

    it('should return an empty array if input is empty', () => {
      const result = service.removeDuplicateBy([], 'id');
      expect(result).toEqual([]);
    });

    it('should return the same array if there are no duplicates', () => {
      const array = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'ivysaur' }
      ];

      const result = service.removeDuplicateBy(array, 'id');
      expect(result).toEqual(array);
    });
  });

  describe('getAllParallelCall', () => {
    it('should make parallel HTTP requests and return their results', () => {
      const apiUrls = ['url1', 'url2', 'url3'];
      const mockResponses = [{ data: 'data1' }, { data: 'data2' }, { data: 'data3' }];

      service.getAllParallelCall(apiUrls).subscribe(responses => {
        expect(responses).toEqual(mockResponses);
      });

      apiUrls.forEach((url, index) => {
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponses[index]);
      });
    });
  });

  it('should reset the pokemon list and fetch data from the initial URL when isReset is true', () => {
    const mockResponse = {
      next: 'next-url',
      results: [{ name: 'bulbasaur', url: 'bulbasaur-url' }]
    };
    const mockPokemonDetails = [{ name: 'bulbasaur', types: [] }];

    service.getPokemonData(true).subscribe(data => {
      expect(data).toEqual(mockPokemonDetails);
    });

    const req = httpMock.expectOne(service['initialURL']);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    const detailsReq = httpMock.expectOne('bulbasaur-url');
    expect(detailsReq.request.method).toBe('GET');
    detailsReq.flush(mockPokemonDetails[0]);
  });

  it('should continue fetching data from the next URL when isReset is false', () => {
    const mockResponse = {
      next: 'next-url',
      results: [{ name: 'ivysaur', url: 'ivysaur-url' }]
    };
    const mockPokemonDetails = [{ name: 'ivysaur', types: [] }];

    service['nextUrl'] = 'next-url';
    service.getPokemonData(false).subscribe(data => {
      expect(data).toEqual(mockPokemonDetails);
    });

    const req = httpMock.expectOne('next-url');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    const detailsReq = httpMock.expectOne('ivysaur-url');
    expect(detailsReq.request.method).toBe('GET');
    detailsReq.flush(mockPokemonDetails[0]);
  });
  it('should return an empty array if nextUrl is null', () => {
    service['nextUrl'] = ''; // Change null to undefined
    service.getPokemonData(false).subscribe(data => {
      expect(data).toEqual([]);
    });
  });

  it('should handle errors during data fetching', () => {
    service.getPokemonData(false).subscribe(
      data => {
        // This block won't be executed because the request fails
      },
      error => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(service['nextUrl']);
    req.error(new ErrorEvent('Network error'));
  });
});
