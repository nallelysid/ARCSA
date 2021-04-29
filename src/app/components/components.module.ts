import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonGridComponent } from './pokemon-grid/pokemon-grid.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';



@NgModule({
  declarations: [
    PokemonGridComponent,
    PokemonCardComponent,
    PokemonDetailsComponent
  ],
  imports: [
    CommonModule,    
  ],
  exports: [
    PokemonCardComponent,
    PokemonGridComponent
  ]
})
export class ComponentsModule { }
