import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { PokemonService } from '../../../core/services/pokemon.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let mockPokemonService: jest.Mocked<PokemonService>;

  beforeEach(async () => {
    mockPokemonService = {
      getPokemonTypes: jest.fn().mockReturnValue(of({ results: [] })),
      getAllPokemonDataList: jest.fn().mockReturnValue(of({ results: [] })),
      setLoading: jest.fn(),
      setFilteredPokemonList: jest.fn(),
      getPokemonData: jest.fn().mockReturnValue(of({})),
      filterByTypes: jest.fn().mockReturnValue(of({})),
      getPokemonDetailsListByUrl: jest.fn().mockReturnValue(of({})),
    } as unknown as jest.Mocked<PokemonService>;

    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      providers: [{ provide: PokemonService, useValue: mockPokemonService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should unsubscribe from searchSubscription on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component['searchSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should emit a trimmed and lowercased search term', (done) => {
    const searchTerm = '  Bulbasaur  ';
    const expectedTerm = 'bulbasaur';

    component['searchSubject'].subscribe((emittedValue) => {
      expect(emittedValue).toBe(expectedTerm);
      done();
    });

    component.onSearchChange(searchTerm);
  });

  it('should emit an empty string if the input is only whitespace', (done) => {
    const searchTerm = '   ';
    const expectedTerm = '';

    component['searchSubject'].subscribe((emittedValue) => {
      expect(emittedValue).toBe(expectedTerm);
      done();
    });

    component.onSearchChange(searchTerm);
  });

  it('should emit a lowercased search term', (done) => {
    const searchTerm = 'Ivysaur';
    const expectedTerm = 'ivysaur';

    component['searchSubject'].subscribe((emittedValue) => {
      expect(emittedValue).toBe(expectedTerm);
      done();
    });

    component.onSearchChange(searchTerm);
  });

  it('should emit true when a search term is provided', (done) => {
    component.filterEnabled.subscribe((isEnabled) => {
      expect(isEnabled).toBe(true);
      done();
    });

    component.performSearch('bulba');
  });

  it('should emit false and reset the list when no search term is provided', (done) => {
    component.filterEnabled.subscribe((isEnabled) => {
      expect(isEnabled).toBe(false);
      done();
    });

    component.performSearch('');
    expect(mockPokemonService.setFilteredPokemonList).toHaveBeenCalledWith([]);
    expect(mockPokemonService.getPokemonData).toHaveBeenCalledWith(true);
  });

  it('should set loading to false after fetching data', () => {
    component.performSearch('bulba');

    expect(mockPokemonService.setLoading).toHaveBeenCalledWith(false);
  });
}); 