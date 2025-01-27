import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyCardComponent } from './property-card.component';

describe('PropertyCardComponent', () => {
  let component: PropertyCardComponent;
  let fixture: ComponentFixture<PropertyCardComponent>;

  const mockPokemon: any = {
    id: 1,
    name: 'Pikachu',
    height: 0.4,
    weight: 6,
    types: [{ type: { name: 'electric' } }],
    abilities: [
      {
          ability: { name: 'static', url: '' }, is_hidden: false,
          slot: 0
      },
      {
          ability: { name: 'lightning-rod', url: '' }, is_hidden: true,
          slot: 0
      }
    ],
    stats: [
      { base_stat: 35, effort: 0, stat: { name: 'hp', url: '' } },
      { base_stat: 55, effort: 0, stat: { name: 'attack', url: '' } }
    ],
    sprites: {
      front_default: 'front-default-url',
      other: {
        dream_world: { front_default: 'dream-world-url' },
        'official-artwork': { front_default: 'official-artwork-url' }
      }
    },
    moves:[{move:
        {name: "razor-wind", url: "https://pokeapi.co/api/v2/move/13/"}},
        {move:
            {name: "razor-wind", url: "https://pokeapi.co/api/v2/move/13/"}},
            {move:
                {name: "razor-wind", url: "https://pokeapi.co/api/v2/move/13/"}},
                {move:
                    {name: "razor-wind", url: "https://pokeapi.co/api/v2/move/13/"}},
                    {move:
                        {name: "razor-wind", url: "https://pokeapi.co/api/v2/move/13/"}}]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyCardComponent);
    component = fixture.componentInstance;
    component.pokemon = mockPokemon;
    component.speciesData = { base_happiness: 70, capture_rate: 190, egg_groups: [{ name: 'field', url: '' }], growth_rate: { name: 'medium-slow', url: '' } };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return formatted stats', () => {
    const result = component.getBaseStats();
    expect(result).toBe('Hp: 35, Attack: 55');
  });

  it('should return abilities', () => {
    const result = component.getAbilities();
    expect(result).toBe('Static, Lightning-rod');
  });

  it('should return formatted growth rate', () => {
    const result = component.getGrowthRate();
    expect(result).toBe('Medium-slow');
  });

  describe('getBaseHappiness', () => {
    it('should return the base happiness from speciesData', () => {
      component.speciesData = { base_happiness: 70 };
      const result = component.getBaseHappiness();
      expect(result).toBe(70);
    });

    it('should return 0 if base_happiness is not defined', () => {
      component.speciesData = {};
      const result = component.getBaseHappiness();
      expect(result).toBe(0);
    });

    it('should return 0 if speciesData is undefined', () => {
      component.speciesData = undefined;
      const result = component.getBaseHappiness();
      expect(result).toBe(0);
    });
  });

  describe('getCaptureRate', () => {
    it('should return the capture rate from speciesData', () => {
      component.speciesData = { capture_rate: 190 };
      const result = component.getCaptureRate();
      expect(result).toBe(190);
    });

    it('should return 0 if capture_rate is not defined', () => {
      component.speciesData = {};
      const result = component.getCaptureRate();
      expect(result).toBe(0);
    });

    it('should return 0 if speciesData is undefined', () => {
      component.speciesData = undefined;
      const result = component.getCaptureRate();
      expect(result).toBe(0);
    });
  });

  describe('getEggGroups', () => {
    it('should return formatted egg groups as a string', () => {
      component.speciesData = {
        egg_groups: [{ name: 'monster' }, { name: 'dragon' }],
      };
      const result = component.getEggGroups();
      expect(result).toBe('Monster, Dragon');
    });
  });

  describe('getGrowthRate', () => {
    it('should return formatted growth rate as a string', () => {
      component.speciesData = { growth_rate: { name: 'medium-slow' } };
      const result = component.getGrowthRate();
      expect(result).toBe('Medium-slow');
    });

    it('should return "Unknown" if growth_rate is not defined', () => {
      component.speciesData = {};
      const result = component.getGrowthRate();
      expect(result).toBe('Unknown');
    });

    it('should return "Unknown" if speciesData is undefined', () => {
      component.speciesData = undefined;
      const result = component.getGrowthRate();
      expect(result).toBe('Unknown');
    });
  });
});
