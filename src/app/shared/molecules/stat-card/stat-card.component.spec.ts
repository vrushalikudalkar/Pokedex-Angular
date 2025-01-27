import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatCardComponent } from './stat-card.component';
import { By } from '@angular/platform-browser';
import { getCamleCaseString } from '../../../core/constants/pokemon-types';

jest.mock('../../../core/constants/pokemon-types', () => ({
  getCamleCaseString: jest.fn((str) => str.charAt(0).toUpperCase() + str.slice(1)),
}));

describe('StatCardComponent', () => {
  let component: StatCardComponent;
  let fixture: ComponentFixture<StatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatCardComponent);
    component = fixture.componentInstance;
    component.stats = [
      { base_stat: 45, stat: { name: 'hp' } },
      { base_stat: 60, stat: { name: 'attack' } },
      { base_stat: 50, stat: { name: 'special-defense' } },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of stats', () => {
    const statItems = fixture.debugElement.queryAll(By.css('.stat-item'));
    expect(statItems.length).toBe(3);
  });

  it('should display the correct stat headings', () => {
    const statLabels = fixture.debugElement.queryAll(By.css('.stat-label'));
    expect(statLabels[0].nativeElement.textContent).toBe('HP');
    expect(statLabels[1].nativeElement.textContent).toBe('Attack');
    expect(statLabels[2].nativeElement.textContent).toBe('Sp. Defense');
  });

  it('should display the correct base stat values', () => {
    const statValues = fixture.debugElement.queryAll(By.css('.stat-value'));
    expect(statValues[0].nativeElement.textContent).toBe('45');
    expect(statValues[1].nativeElement.textContent).toBe('60');
    expect(statValues[2].nativeElement.textContent).toBe('50');
  });

  it('should call getCamleCaseString with correct arguments', () => {
    component.getStatHeading('special-defense');
    expect(getCamleCaseString).toHaveBeenCalledWith('defense');
  });

  it('should return correct stat heading for special cases', () => {
    expect(component.getStatHeading('hp')).toBe('HP');
    expect(component.getStatHeading('special-defense')).toBe('Sp. Defense');
    expect(component.getStatHeading('attack')).toBe('Attack');
  });
}); 