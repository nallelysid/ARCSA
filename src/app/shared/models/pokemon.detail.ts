import { type } from "./type";

export interface PokemonDetailModel{
    id: number,
    name: string,
    image: string,
    types?: type[],
        
    stats?: [{
        base_stat : number,
        stat:{
            name:string
        }}]
   
}