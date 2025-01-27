import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectDropdownComponent),
      multi: true,
    },
  ],
})
export class MultiSelectDropdownComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() label = '';
  @Input() data: any[] = [];
  @Input() isOpen = false;
  @Output() selectionChange = new EventEmitter<any>();
  @Output() openChange = new EventEmitter<void>();
  @Output() closeChange = new EventEmitter<void>();
  @Output() cleanChange = new EventEmitter<void>();

  selectControl = new FormControl<any>([]);

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    this.selectControl.valueChanges.subscribe(value => {
      if (value) {
        this.selectionChange.emit(value);
      }
    });
  }

  onOpenChange(isOpen: any): void {
    if (isOpen) {
      this.openChange.emit();
    } else {
      this.closeChange.emit();
    }
  }

  onClear(): void {
    this.selectControl.setValue([]);
    this.cleanChange.emit();
  }

  writeValue(value: any): void {
    // Update the component with the new value
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle the disabled state
  }
} 