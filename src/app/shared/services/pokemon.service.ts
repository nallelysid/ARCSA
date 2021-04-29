import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonCard } from '../models/pokemon.card';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonDetailModel } from '../models/pokemon.detail';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl : string = environment.baseURLAPI;

  private _totalSubject = new BehaviorSubject<any>({});
  private _total$ = this._totalSubject.asObservable();

  private _pockemonListSubject = new BehaviorSubject<PokemonCard[]>([]);
  private _pockemonListSubject$ = this._pockemonListSubject.asObservable();

  private _nextSubject = new BehaviorSubject<any>({});
  private _next$ = this._nextSubject.asObservable();

  private _previousSubject = new BehaviorSubject<any>({});
  private _previous$ = this._previousSubject.asObservable();

  // private _pockemonDetailSubject = new BehaviorSubject<PokemonDetailModel[]>([]);
  // private _pockemonDetailSubject$ = this._pockemonDetailSubject.asObservable();





  constructor(private http : HttpClient) { }

  
  get pockemonList() : PokemonCard[]{
    return this._pockemonListSubject.value;
  }
  get pockemonList$() : Observable<PokemonCard[]>{
    return this._pockemonListSubject$
  }

  get total$(){
    return this._total$;
  }
  get next$(){
    return this._next$;
  }
  get previous$(){
    return this._previous$;
  }

  list( query = '', page = 1): void{
    let list: PokemonCard[] = [];
    let url: string = `${this.baseUrl}/pokemon/${query}`;
     this.http.get<PokemonCard[]>(url).pipe(
     
       tap( (res: any ) => this._pockemonListSubject.next(res.results))
       
     )
     .subscribe((res:any)=>{
      // this.updateSubjects(res);
    });

  }

  getPokemon(url : string) : Observable<any> {    
    return this.http.get<PokemonDetailModel>(url)
  }


  private updateSubjects(res:any){
    this._pockemonListSubject.next(res.results);
    this._totalSubject.next(res.count);
    this._nextSubject.next(res.next);
    this._previousSubject.next(res.previous);
  }


}
