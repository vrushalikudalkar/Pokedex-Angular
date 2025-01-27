import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorfulTagComponent } from './colorful-tag.component';

describe('ColorfulTagComponent', () => {
  let component: ColorfulTagComponent;
  let fixture: ComponentFixture<ColorfulTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorfulTagComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorfulTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct text', () => {
    component.text = 'Fire';
    fixture.detectChanges();
    const tagElement: HTMLElement = fixture.nativeElement;
    expect(tagElement.textContent).toContain('Fire');
  });

  it('should apply the correct className', () => {
    component.className = 'test-class';
    fixture.detectChanges();
    const tagElement: HTMLElement = fixture.nativeElement.querySelector('.test-class');
    expect(tagElement).toBeTruthy();
  });

  it('should apply the correct type color', () => {
    component.type = 'fire';
    fixture.detectChanges();
    const color = component.getPokemonColor('fire');
    expect(color).toBeDefined();
  });
}); 