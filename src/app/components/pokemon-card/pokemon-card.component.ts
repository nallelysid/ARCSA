import { Component, Input, OnInit } from '@angular/core';
import { PokemonDetailModel } from '@app/shared/models/pokemon.detail';


@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.sass']
})
export class PokemonCardComponent implements OnInit {
  @Input('dataPockemon') dataPockemon! : PokemonDetailModel;
  constructor() { }

  ngOnInit(): void {
  }

}
