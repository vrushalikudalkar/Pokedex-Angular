import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FilterComponent } from './filter.component';
import { SearchFilterComponent } from '../../atoms/search-filter/search-filter.component';
import { MultiSelectDropdownComponent } from '../../molecules/multi-select-dropdown/multi-select-dropdown.component';




@NgModule({
  declarations: [
    FilterComponent,
    MultiSelectDropdownComponent,
    SearchFilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    FilterComponent
  ]
})
export class FilterModule { } 