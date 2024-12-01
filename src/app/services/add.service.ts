import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class AddService {
  private url = 'http://localhost:3000/pokemon/';
  constructor(private http: HttpClient) { }

  AddPokemon(pokemon: Pokemon): Observable<Pokemon>{
    return this.http.post<Pokemon>(this.url, pokemon);
  }
}