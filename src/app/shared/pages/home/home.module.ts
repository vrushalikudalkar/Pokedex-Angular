import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared.module';
import { FilterModule } from '../../organisms/filter/filter.module';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    FilterModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { } 