import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonCard } from '@app/shared/models/pokemon.card';
import { PokemonDetailModel } from '@app/shared/models/pokemon.detail';
import { PokemonService } from '@app/shared/services/pokemon.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.sass']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon : PokemonDetailModel;
  marvel: boolean = false;

  constructor(
    private activaterouter: ActivatedRoute,
    private pokemonServices: PokemonService,
    private router: Router
  ) {
      this.pokemon = {
        id : 0,
        name: '',
        image: '',
        
        types: []
      }
   }

  ngOnInit(): void {
    this.activaterouter.params.subscribe(params => {
      this.pokemonServices.getPokemon(params["url"])
      .pipe(
        map(
          (r:any)=>{
            this.pokemon  = {
              id: r.id,
              name:r.name,
              image: r.sprites.front_default,
              stats: r.stats,
              types: r.types
            }
          }
        )
      )
      
      
      .subscribe((r)=> {
        console.log('Tarjeta',this.pokemon);});
     
      
    });
  }

  regresaMain(){
   
    this.router.navigate(['/home']);
  }

}
