import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsHeaderComponent } from './details-header.component';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

jest.mock('../../../core/constants/pokemon-types', () => ({
  getPokemonDescription: jest.fn(() => 'Mocked description'),
}));

describe('DetailsHeaderComponent', () => {
  let component: DetailsHeaderComponent;
  let fixture: ComponentFixture<DetailsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsHeaderComponent],
      imports: [MatIconModule, MatTooltipModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsHeaderComponent);
    component = fixture.componentInstance;
    component.pokemon = { name: 'Pikachu', id: 25 };
    component.speciesData = { flavor_text_entries: [{ flavor_text: 'Electric mouse', language: { name: 'en' } }] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit backClick event', () => {
    const emitSpy = jest.spyOn(component.backClick, 'emit');
    const button = fixture.debugElement.query(By.css('button[mat-icon-button]')).nativeElement;
    button.click();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should display the correct pokemon name and id', () => {
    const nameElement = fixture.debugElement.query(By.css('.pokemon-name .text-caps')).nativeElement;
    const idElement = fixture.debugElement.query(By.css('.pokemon-name .id-wrap h3')).nativeElement;
    expect(nameElement.textContent).toBe('Pikachu');
    expect(idElement.textContent).toBe('025');
  });

  it('should display the correct description', () => {
    const descriptionElement = fixture.debugElement.query(By.css('.pokemon-description p')).nativeElement;
    expect(descriptionElement.textContent).toContain('Mocked description');
  });
}); 