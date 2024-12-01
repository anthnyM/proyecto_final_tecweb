import { Component } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { AddService } from '../../services/add.service';
import { PokemonComponent } from '../../elements/pokemon/pokemon.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  pokemon: Pokemon = {
    name: '',
    type: [],
    base: {
      HP: 0,
      Attack: 0,
      Defense: 0,
      Speed: 0
    },
    evolution: {
      prev: null,
      next: []
    },
    generation: 1,
    legendary: false,
    image: ''
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;
  types: string[] = ['Fire', 'Grass', 'Poison', 'Water', 'Electric', 'Fairy', 'Normal', 'Fighting', 'Dragon', 'Flying'];

  constructor(private addService: AddService) {}


  addPokemon(): void{
    this.addService.AddPokemon(this.pokemon).subscribe(
      (data) => {
        this.successMessage = `${this.pokemon.name} has been added successfully!`;
        this.errorMessage = null;
        this.resetForm();
      },
      (error) => {
        this.errorMessage = 'Failed to add Pokémon. Please try again.';
        this.successMessage = null;
      }
    )
  }
  resetForm(): void {
    this.pokemon = {
      name: '',
      type: [],
      base: {
        HP: 0,
        Attack: 0,
        Defense: 0,
        Speed: 0
      },
      evolution: {
        prev: null,
        next: []
      },
      generation: 1,
      legendary: false,
      image: ''
    };
  }

  toggleType(type: string): void {
    const index = this.pokemon.type.indexOf(type);
    if (index === -1) {
      this.pokemon.type.push(type); 
    } else {
      this.pokemon.type.splice(index, 1); 
    }
  }
}
