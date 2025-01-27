import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { PokemonService } from '../../../core/services/pokemon.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockPokemonService: jest.Mocked<PokemonService>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    mockPokemonService = {
      pokemonList$: of([]),
      filteredPokemonList$: of([]),
      loading$: of(false),
      loadMoreInProgress$: of(false),
      setLoading: jest.fn(),
      getPokemonData: jest.fn().mockReturnValue(of({})),
    } as unknown as jest.Mocked<PokemonService>;

    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading to true on init', () => {
    expect(mockPokemonService.setLoading).toHaveBeenCalledWith(true);
  });

  it('should navigate to details on handlePokemonClick', () => {
    component.handlePokemonClick(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/details', 1]);
  });

  it('should call getPokemonData on handleLoadMore', () => {
    component.handleLoadMore();
    expect(mockPokemonService.getPokemonData).toHaveBeenCalled();
  });

  it('should update isFilterEnabled on onFilterEnabled', () => {
    component.onFilterEnabled(true);
    expect(component.isFilterEnabled).toBe(true);
  });

  it('should return filteredList$ when filter is enabled', () => {
    component.isFilterEnabled = true;
    expect(component.getDisplayList()).toBe(mockPokemonService.filteredPokemonList$);
  });

  it('should return pokemonList$ when filter is not enabled', () => {
    component.isFilterEnabled = false;
    expect(component.getDisplayList()).toBe(mockPokemonService.pokemonList$);
  });
}); 