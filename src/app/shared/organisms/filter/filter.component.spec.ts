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

  it('should toggle isTypeFilterOpen on type filter open/close', () => {
    component.onTypeFilterOpen();
    expect(component.isTypeFilterOpen).toBe(true);
    component.onTypeFilterClose();
    expect(component.isTypeFilterOpen).toBe(false);
  });
}); 