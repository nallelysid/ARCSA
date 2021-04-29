import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonGridComponent } from './components/pokemon-grid/pokemon-grid.component';

const routes: Routes = [
  {path: 'home', component: PokemonGridComponent},
  {path: 'detail/:url', component: PokemonDetailsComponent},
  {path: '**', redirectTo: 'home'},
  {path: '', 
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
