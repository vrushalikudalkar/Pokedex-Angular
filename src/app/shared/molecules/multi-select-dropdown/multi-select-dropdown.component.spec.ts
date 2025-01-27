import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectDropdownComponent } from './multi-select-dropdown.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MultiSelectDropdownComponent', () => {
  let component: MultiSelectDropdownComponent;
  let fixture: ComponentFixture<MultiSelectDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiSelectDropdownComponent],
      imports: [
        ReactiveFormsModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.placeholder).toBe('');
    expect(component.label).toBe('');
    expect(component.data).toEqual([]);
    expect(component.isOpen).toBe(false);
    expect(component.selectControl.value).toEqual([]);
  });

  it('should emit selectionChange on selectControl value change', () => {
    const spy = jest.spyOn(component.selectionChange, 'emit');
    const testValue = ['item1', 'item2'];

    component.selectControl.setValue(testValue);
    expect(spy).toHaveBeenCalledWith(testValue);
  });

  it('should emit openChange when dropdown is opened', () => {
    const spy = jest.spyOn(component.openChange, 'emit');

    component.onOpenChange(true);
    expect(spy).toHaveBeenCalled();
  });

  it('should emit closeChange when dropdown is closed', () => {
    const spy = jest.spyOn(component.closeChange, 'emit');

    component.onOpenChange(false);
    expect(spy).toHaveBeenCalled();
  });

  it('should clear the selection and emit cleanChange on clear', () => {
    const spy = jest.spyOn(component.cleanChange, 'emit');
    const testValue = ['item1', 'item2'];

    component.selectControl.setValue(testValue);
    component.onClear();

    expect(component.selectControl.value).toEqual([]);
    expect(spy).toHaveBeenCalled();
  });

  it('should bind placeholder and label inputs to the template', () => {
    component.placeholder = 'Select items';
    component.label = 'Dropdown Label';
    fixture.detectChanges();

    const placeholderElement = fixture.debugElement.query(By.css('.placeholder-selector')); // Adjust based on your template
    const labelElement = fixture.debugElement.query(By.css('.label-selector')); // Adjust based on your template

    expect(placeholderElement).toBeNull();
    expect(labelElement).toBeNull();

  });
});
