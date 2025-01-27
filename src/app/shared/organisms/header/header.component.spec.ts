import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct header title and subtitle', () => {
    const titleElement = fixture.debugElement.query(By.css('.header-title')).nativeElement;
    const subtitleElement = fixture.debugElement.query(By.css('.header-subtitle')).nativeElement;
    expect(titleElement.textContent).toBe('Pokédex');
    expect(subtitleElement.textContent).toBe('Explore the world of Pokémon');
  });
}); 