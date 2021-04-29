import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PokemonCard } from '@app/shared/models/pokemon.card';
import { PokemonDetailModel } from '@app/shared/models/pokemon.detail';
import { DetailService } from '@app/shared/services/detail.service';
import { PokemonService } from '@app/shared/services/pokemon.service';
import { forkJoin, from, of, Subject, Subscription } from 'rxjs';
import { concatMap, map, mergeMap, scan, switchMap, takeUntil, tap, toArray } from 'rxjs/operators';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';


@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon-grid.component.html',
  styleUrls: ['./pokemon-grid.component.sass']
})
export class PokemonGridComponent implements OnInit, OnDestroy {
  filter : string = '';
  data : any[] = [];
  detalle_list : any[] = [];

  total : number = 0;
  next: string = '';
  previous: string = '';
  componentDestroyed$: Subject<boolean> = new Subject()
  Pokemon! : any;

  constructor(private _pokemonService : PokemonService,
              private _detailService : DetailService,
              private router: Router) { 
                this.detalle_list = []; 
                
              }
  ngOnDestroy(): void {
    this.detalle_list = []; 
    
  }

  ngOnInit(): void {
    
    
    if(this.detalle_list.length <= 0){
      this._pokemonService.list(this.filter);
      this.getDataSource();
    }
  
    //this._pokemonService.total$.subscribe(total => this.total = total);
    //this._pokemonService.next$.subscribe(next => this.next = next);
    //this._pokemonService.previous$.subscribe(previous => this.previous = previous);


    
  }

  onSearch(url : string){
    
    this.router.navigate(['/detail', url]);
  }

  getDataSource(){
    
    let getDta = this._pokemonService.pockemonList$
    .pipe(
      takeUntil(this.componentDestroyed$),
      map(res=>       
        res.map(dt => 
                {              
                  this._pokemonService.getPokemon(dt.url)
                  .pipe(
                    map( 
                      (x:any) =>                  
                    this.Pokemon = 
                    {
                      //  id: x.id,
                      //  image: x.sprites.front_default,
                      //  name: x.name, 
                      //  url: x.url,
                      id: x.id,
                      image: x.sprites.front_default,
                      name: x.name,
                      types: x.types,
                      stats: x.stats,
                      url: dt.url                      
                    
                      }
                    )
                  )
                  .subscribe( (p) => {
                    console.log('pokemon',p)         
                  
                    this.detalle_list = [ ... this.detalle_list, p]             
                  })
                }
               )  
        
          )
    )
    
    getDta.subscribe(
      x => {
        console.log('Examplepromise pokemon:', x);
        
        
      },
      err => console.error('Error al traer datos pokemon', err),
      
      () => console.log('Observer got a complete notification')
      
    )
  }



}
