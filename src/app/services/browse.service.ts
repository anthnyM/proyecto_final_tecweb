import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
@Injectable({
  providedIn: 'root'
})
export class BrowseService {
  private url = 'http://localhost:3000/pokemon';

  constructor(private http: HttpClient) { }

  getAllPokemon(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(this.url);
  }

  getPokemonFiltered(filters: {type?: string, generation?: number; legendary?: boolean, name?: string}): Observable<Pokemon[]>{
    let params = new HttpParams();
    if (filters.type) {
      params = params.set('type', filters.type);
    }
    if (filters.generation) {
      params = params.set('generation', filters.generation.toString());
    }
    if (filters.legendary !== undefined) {
      params = params.set('legendary', filters.legendary.toString());
    }
    if (filters.name) {
      params = params.set('name', filters.name);
    }
    return this.http.get<Pokemon[]>(this.url + '/filter/', {params});
  }
}
