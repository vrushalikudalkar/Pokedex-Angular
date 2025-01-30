import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatCardComponent } from './stat-card.component';
import { By } from '@angular/platform-browser';
import { getCamleCaseString } from '../../../core/constants/pokemon-types';
import { mockPokemonStat } from 'src/app/core/models/pokemon-mocks';

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
    component.stats = [mockPokemonStat]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of stats', () => {
    const statItems = fixture.debugElement.queryAll(By.css('.stat-item'));
    expect(statItems.length).toBe(1);
  });

  it('should display the correct stat headings', () => {
    const statLabels = fixture.debugElement.queryAll(By.css('.stat-label'));
    expect(statLabels[0].nativeElement.textContent).toBe('Speed');
  });

  it('should display the correct base stat values', () => {
    const statValues = fixture.debugElement.queryAll(By.css('.stat-value'));
    expect(statValues[0].nativeElement.textContent).toBe('45');
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