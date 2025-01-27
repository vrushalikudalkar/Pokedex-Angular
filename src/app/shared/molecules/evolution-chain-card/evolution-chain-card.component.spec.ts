import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EvolutionChainCardComponent } from './evolution-chain-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('EvolutionChainCardComponent', () => {
  let component: EvolutionChainCardComponent;
  let fixture: ComponentFixture<EvolutionChainCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvolutionChainCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionChainCardComponent);
    component = fixture.componentInstance;
    component.evolutionChain = [
      { name: 'bulbasaur', sprites: { other: { 'official-artwork': { front_default: 'bulbasaur.png' } } } },
      { name: 'ivysaur', sprites: { other: { 'official-artwork': { front_default: 'ivysaur.png' } } } },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of evolution stages', () => {
    const evolutionElements = fixture.debugElement.queryAll(By.css('.pokemon-evolution'));
    expect(evolutionElements.length).toBe(2);
  });

  it('should display the correct pokemon names', () => {
    const nameElements = fixture.debugElement.queryAll(By.css('.name'));
    expect(nameElements[0].nativeElement.textContent).toBe('Bulbasaur');
    expect(nameElements[1].nativeElement.textContent).toBe('Ivysaur');
  });

  it('should display the correct images', () => {
    const imgElements = fixture.debugElement.queryAll(By.css('img'));
    expect(imgElements[0].nativeElement.src).toContain('bulbasaur.png');
    expect(imgElements[1].nativeElement.src).toContain('ivysaur.png');
  });
}); 