import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

jest.mock('../../../core/constants/pokemon-types', () => ({
  getBackground: jest.fn(() => 'mocked-background'),
}));

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.data = {
      id: 1,
      name: 'bulbasaur',
      types: [{ type: { name: 'grass' } }],
      sprites: {
        other: {
          'official-artwork': { front_default: 'bulbasaur.png' },
          dream_world: { front_default: 'bulbasaur-dream.png' },
        },
        front_default: 'bulbasaur-default.png',
      },
      height: 7,
      weight: 69,
      abilities: [],
      stats: [],
      moves:[{move:{name:'move1',url:'move.com'}}]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cardClick on click', () => {
    const emitSpy = jest.spyOn(component.cardClick, 'emit');
    const cardElement = fixture.debugElement.query(By.css('.pokemon-card')).nativeElement;
    cardElement.click();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should display the correct pokemon number', () => {
    const numberElement = fixture.debugElement.query(By.css('.pokemon-number')).nativeElement;
    expect(numberElement.textContent).toBe('#001');
  });

  it('should display the correct pokemon name', () => {
    const nameElement = fixture.debugElement.query(By.css('.pokemon-name')).nativeElement;
    expect(nameElement.textContent).toBe('Bulbasaur');
  });

  it('should display the correct pokemon types', () => {
    const typeElements = fixture.debugElement.queryAll(By.css('.type'));
    expect(typeElements.length).toBe(1);
    expect(typeElements[0].nativeElement.textContent).toBe(' Grass ');
  });

  it('should use the correct background', () => {
    const cardElement = fixture.debugElement.query(By.css('.pokemon-card')).nativeElement;
    expect(cardElement.style.background).toBe('');
  });

  it('should use the correct image URL', () => {
    const imgElement = fixture.debugElement.query(By.css('.pokemon-image img')).nativeElement;
    expect(imgElement.src).toContain('bulbasaur.png');
  });

  it('should format pokemon number correctly', () => {
    expect(component.getPokemonNumber(1)).toBe('001');
    expect(component.getPokemonNumber(10)).toBe('010');
    expect(component.getPokemonNumber(100)).toBe('100');
  });

  it('should return the correct image URL', () => {
    expect(component.getImageUrl()).toBe('bulbasaur.png');
  });

  it('should update the view when data input changes', () => {
    component.data = {
        id: 2,
        name: 'ivysaur',
        types: [{ type: { name: 'Poison' } }],
        sprites: {
          other: {
            'official-artwork': { front_default: 'ivysaur.png' },
            dream_world: { front_default: 'ivysaur.png' },
          },
          front_default: 'ivysaur.png',
        },
        height: 7,
        weight: 69,
        abilities: [],
        stats: [],
        moves:[{move:{name:'move1',url:'move.com'}}]
      };
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('.pokemon-name')).nativeElement;
    const numberElement = fixture.debugElement.query(By.css('.pokemon-number')).nativeElement;
    const imgElement = fixture.debugElement.query(By.css('.pokemon-image img')).nativeElement;
    const typeElements = fixture.debugElement.queryAll(By.css('.type'));

    expect(nameElement.textContent).toBe('Ivysaur');
    expect(numberElement.textContent).toBe('#002');
    expect(imgElement.src).toContain('ivysaur.png');
    expect(typeElements.length).toBe(1);
    expect(typeElements[0].nativeElement.textContent).toBe(' Poison ');
  });
});