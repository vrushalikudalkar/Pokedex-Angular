import { getBackground, getCamleCaseString, getPokcolor, getPokemonDescription, POKEMON_TYPE } from "../constants/pokemon-types";


describe('Pokemon Types Constants and Functions', () => {
  describe('POKEMON_TYPE', () => {
    it('should have a defined color for each type', () => {
      Object.keys(POKEMON_TYPE).forEach(type => {
        expect(POKEMON_TYPE[type].color).toBeDefined();
        expect(POKEMON_TYPE[type].hex).toBeDefined();
      });
    });
  });

  describe('getPokcolor', () => {
    it('should return the correct color for a known type', () => {
      expect(getPokcolor('fire')).toBe('#F08030');
    });

    it('should return the unknown color for an unknown type', () => {
      expect(getPokcolor('unknownType')).toBe(POKEMON_TYPE['unknown'].color);
    });

    it('should handle case insensitivity', () => {
      expect(getPokcolor('FiRe')).toBe('#F08030');
    });
  });

  describe('getBackground', () => {
    it('should return a linear gradient for two types', () => {
      const types = [{ type: { name: 'fire' } }, { type: { name: 'water' } }];
      const expectedGradient = `linear-gradient(180deg, ${getPokcolor('fire')} 0%, ${getPokcolor('water')} 100%)`;
      expect(getBackground(types)).toBe(expectedGradient);
    });

    it('should return a single color for one type', () => {
      const types = [{ type: { name: 'grass' } }];
      expect(getBackground(types)).toBe(getPokcolor('grass'));
    });

    it('should return an empty string for no types', () => {
      expect(getBackground([])).toBe('');
    });
  });

  describe('getPokemonDescription', () => {
    it('should return a concatenated description for English texts', () => {
      const data = [
        { language: { name: 'en' }, flavor_text: 'First description.' },
        { language: { name: 'en' }, flavor_text: 'Second description.' },
        { language: { name: 'jp' }, flavor_text: 'Japanese description.' }
      ];
      const expectedDescription = 'First description.Second description.';
      expect(getPokemonDescription(data)).toBe(expectedDescription);
    });

    it('should handle duplicate descriptions', () => {
      const data = [
        { language: { name: 'en' }, flavor_text: 'Duplicate description.' },
        { language: { name: 'en' }, flavor_text: 'Duplicate description.' }
      ];
      const expectedDescription = 'Duplicate description.';
      expect(getPokemonDescription(data)).toBe(expectedDescription);
    });

    it('should return an empty string for no data', () => {
      expect(getPokemonDescription()).toBe('');
    });
  });

  describe('getCamleCaseString', () => {
    it('should convert a string to camel case', () => {
      expect(getCamleCaseString('example')).toBe('Example');
      expect(getCamleCaseString('EXAMPLE')).toBe('Example');
      expect(getCamleCaseString('eXaMpLe')).toBe('Example');
    });
  });
});