import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFilterComponent } from './search-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFilterComponent],
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule,BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct placeholder', () => {
    component.placeholder = 'Search...';
    fixture.detectChanges();
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.placeholder).toBe('Search...');
  });

  it('should apply the correct input class', () => {
    component.inputClass = 'custom-class';
    fixture.detectChanges();
    const formFieldElement = fixture.debugElement.query(By.css('mat-form-field')).nativeElement;
    expect(formFieldElement.classList).toContain('custom-class');
  });

  it('should display the correct label', () => {
    component.label = 'Filter';
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(By.css('.filter-label span')).nativeElement;
    expect(labelElement.textContent).toBe('Filter');
  });

  it('should emit searchChange event on input change', (done) => {
    const testValue = 'test';
    component.searchChange.subscribe((value) => {
      expect(value).toBe(testValue);
      done();
    });

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  });

  it('should debounce input changes', (done) => {
    const testValue = 'debounce test';
    let emitCount = 0;

    component.searchChange.subscribe((value) => {
      emitCount++;
      if (emitCount === 1) {
        expect(value).toBe(testValue);
        done();
      }
    });

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    setTimeout(() => {
      expect(emitCount).toBe(1);
    }, 300); // Wait for debounce time
  });
}); 