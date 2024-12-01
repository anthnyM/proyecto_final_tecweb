import { Component, OnInit } from '@angular/core';
import { BrowseService } from '../../services/browse.service';
import { Pokemon } from '../../models/pokemon';
import { PokemonComponent } from '../../elements/pokemon/pokemon.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [PokemonComponent, CommonModule, FormsModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent implements OnInit{
  pokemonList: Pokemon[] = [];
  error: string | null = null;
  isLoading = true;
  filters = {
    type: '',
    generation: null as number | null,
    legendary: false,
    name: ''
  };

  constructor(private browseService: BrowseService) {}

  ngOnInit(): void {
    this.fetchPokemon();
  }

  fetchPokemon(): void {
    this.browseService.getAllPokemon().subscribe({
      next: (data) => {
        this.pokemonList = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Failed to Load";
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.browseService.getPokemonFiltered(this.filters).subscribe(
      (data) => {
        this.pokemonList = data;
      },
      (error) => {
        console.error('Error fetching pokemon: ', error);
      }
    );
  }

}
