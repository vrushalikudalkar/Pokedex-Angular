import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Pokemon } from 'src/app/core/models/pokemon.types';

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
  @Input() data: Pokemon[] = [];
  @Input() isOpen = false;
  @Output() selectionChange = new EventEmitter<string[]>();
  @Output() openChange = new EventEmitter<void>();
  @Output() closeChange = new EventEmitter<void>();
  @Output() cleanChange = new EventEmitter<void>();

  selectControl = new FormControl<string[]>([]);

  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    this.selectControl.valueChanges.subscribe(value => {
      if (value) {
        this.selectionChange.emit(value);
      }
    });
  }

  onOpenChange(isOpen: boolean): void {
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

  writeValue(): void {
    // Update the component with the new value
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(): void {
    // Handle the disabled state
  }
} 