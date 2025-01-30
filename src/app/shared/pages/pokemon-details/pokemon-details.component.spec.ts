import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { PokemonService } from '../../../core/services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let mockPokemonService: jest.Mocked<PokemonService>;
  let mockRouter: jest.Mocked<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockPokemonService = {
      getPokemonDataById: jest.fn().mockReturnValue(of({ id: 1 })),
      getSpeciesDataById: jest.fn().mockReturnValue(of({})),
      getPokemonEvolutionChain: jest.fn().mockReturnValue(of([])),
    } as unknown as jest.Mocked<PokemonService>;

    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    mockActivatedRoute = {
      params: of({ id: 1 }),
    };

    await TestBed.configureTestingModule({
      declarations: [PokemonDetailsComponent],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemon data on init', () => {
    expect(mockPokemonService.getPokemonDataById).toHaveBeenCalledWith(1);
  });

  it('should navigate to previous pokemon on onPreviousPokemon', () => {
    component.currentId = 2;
    component.onPreviousPokemon();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/details', 1]);
  });

  it('should navigate to next pokemon on onNextPokemon', () => {
    component.currentId = 1;
    component.onNextPokemon();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/details', 2]);
  });

  it('should navigate to home on onClose', () => {
    component.onClose();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
}); 