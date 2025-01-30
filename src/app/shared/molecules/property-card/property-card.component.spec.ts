import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyCardComponent } from './property-card.component';
import { mockPokemon, mockPokemonSpecies, mockPokemonSpeciesEmpty, mockPokemonSpeciesUndefined } from 'src/app/core/models/pokemon-mocks';

describe('PropertyCardComponent', () => {
  let component: PropertyCardComponent;
  let fixture: ComponentFixture<PropertyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyCardComponent);
    component = fixture.componentInstance;
    component.pokemon = mockPokemon;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return formatted stats', () => {
    const result = component.getBaseStats();
    expect(result).toBe('Speed: 45');
  });

  it('should return abilities', () => {
    const result = component.getAbilities();
    expect(result).toBe('Overgrow');
  });

  it('should return formatted growth rate', () => {
    const result = component.getGrowthRate();
    expect(result).toBe('Unknown');
  });

  describe('getBaseHappiness', () => {
    it('should return the base happiness from speciesData', () => {
      component.speciesData = mockPokemonSpecies;
      const result = component.getBaseHappiness();
      expect(result).toBe(70);
    });

    it('should return 0 if base_happiness is not defined', () => {
      component.speciesData = mockPokemonSpeciesEmpty;
      const result = component.getBaseHappiness();
      expect(result).toBe(0);
    });

    it('should return 0 if speciesData is undefined', () => {
      component.speciesData = mockPokemonSpeciesUndefined;
      const result = component.getBaseHappiness();
      expect(result).toBe(0);
    });
  });

  describe('getCaptureRate', () => {
    it('should return the capture rate from speciesData', () => {
      component.speciesData = mockPokemonSpecies;
      const result = component.getCaptureRate();
      expect(result).toBe(45);
    });

    it('should return 0 if capture_rate is not defined', () => {
      component.speciesData = mockPokemonSpeciesEmpty;
      const result = component.getCaptureRate();
      expect(result).toBe(0);
    });

    it('should return 0 if speciesData is undefined', () => {
      component.speciesData = mockPokemonSpeciesUndefined;
      const result = component.getCaptureRate();
      expect(result).toBe(0);
    });
  });

  describe('getEggGroups', () => {
    it('should return formatted egg groups as a string', () => {
      component.speciesData = mockPokemonSpecies
      const result = component.getEggGroups();
      expect(result).toBe('Monster');
    });
  });

  describe('getGrowthRate', () => {
    it('should return formatted growth rate as a string', () => {
      component.speciesData = mockPokemonSpecies;
      const result = component.getGrowthRate();
      expect(result).toBe('Medium-slow');
    });

    it('should return "Unknown" if growth_rate is not defined', () => {
      component.speciesData = mockPokemonSpeciesEmpty;
      const result = component.getGrowthRate();
      expect(result).toBe('Unknown');
    });

    it('should return "Unknown" if speciesData is undefined', () => {
      component.speciesData = mockPokemonSpeciesUndefined;
      const result = component.getGrowthRate();
      expect(result).toBe('Unknown');
    });
  });
});
