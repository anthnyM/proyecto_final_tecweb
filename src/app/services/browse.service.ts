import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
@Injectable({
  providedIn: 'root'
})
export class BrowseService {
  private url = 'http://localhost:3000/pokemon';

  constructor(private http: HttpClient) { }

  getAllPokemon(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(this.url)
  }
}
