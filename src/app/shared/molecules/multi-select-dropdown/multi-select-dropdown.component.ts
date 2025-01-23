import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss']
})
export class MultiSelectDropdownComponent {
  @Input() placeholder = '';
  @Input() label = '';
  @Input() data: any[] = [];
  @Input() isOpen = false;
  @Output() selectionChange = new EventEmitter<any>();
  @Output() openChange = new EventEmitter<void>();
  @Output() closeChange = new EventEmitter<void>();
  @Output() cleanChange = new EventEmitter<void>();

  selectControl = new FormControl<any>([]);

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
} 