import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { API_URLS } from '../constants/api-urls';

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

  it('should transform type data', () => {
    const mockTypes = [{ name: 'fire', url: 'fire-url' }];
    const transformedData = service.transformTypeData(mockTypes);

    expect(transformedData).toEqual([{ label: 'Fire', value: 'fire-url', url: 'fire-url' }]);
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

  it('should handle filtering by types', () => {
    const typeUrls = ['type-url-1', 'type-url-2'];
    const mockResponses = [
      { pokemon: [{ pokemon: { name: 'bulbasaur', url: 'url-1' } }] },
      { pokemon: [{ pokemon: { name: 'charmander', url: 'url-2' } }] }
    ];
    const mockDetails = [{ name: 'bulbasaur' }, { name: 'charmander' }];

    service.filterByTypes(typeUrls).subscribe(filteredList => {
      expect(filteredList).toEqual(mockDetails);
    });

    const req1 = httpMock.expectOne('type-url-1');
    req1.flush(mockResponses[0]);

    const req2 = httpMock.expectOne('type-url-2');
    req2.flush(mockResponses[1]);

    const req3 = httpMock.expectOne('url-1');
    req3.flush(mockDetails[0]);

    const req4 = httpMock.expectOne('url-2');
    req4.flush(mockDetails[1]);
  });
});
