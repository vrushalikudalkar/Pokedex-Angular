import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    pathMatch: 'full'
  },
  {
    path: 'details',
    loadChildren: () => import('./features/pokemon-details/pokemon-details.module').then(m => m.PokemonDetailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 