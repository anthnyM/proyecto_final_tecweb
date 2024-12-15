import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class AddService {
  private url = 'https://poke-api-bogosorters.onrender.com/pokemon/';
  constructor(private http: HttpClient) { }

  AddPokemon(pokemon: Pokemon): Observable<Pokemon>{
    return this.http.post<Pokemon>(this.url, pokemon);
  }

  GetPokemonByName(name: String): Observable<Pokemon>{
    return this.http.get<Pokemon>(this.url + "name/" + name);
  }
}
