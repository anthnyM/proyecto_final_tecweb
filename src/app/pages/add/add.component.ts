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
  preEvo: string | null = null;
  Evo: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  types: string[] = ['Fire', 'Grass', 'Poison', 'Water', 'Electric', 'Fairy', 'Normal', 'Fighting', 'Dragon', 'Flying'];

  constructor(private addService: AddService) {}


  addPokemon(): void {
    this.setPreEvolution()
      .then(() => this.setNextEvolution())
      .then(() => this.setImageData()) 
      .then(() => this.savePokemon())
      .catch((error) => {
        this.errorMessage = error;
        this.successMessage = null;
      });
  }
  
  private setPreEvolution(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.preEvo) {
        this.addService.GetPokemonByName(this.preEvo).subscribe(
          (data) => {
            this.pokemon.evolution.prev = data._id;
            resolve();
          },
          () => reject('Failed to fetch pre-evolution. Please try again.')
        );
      } else {
        resolve();
      }
    });
  }
  
  private setNextEvolution(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.Evo) {
        this.addService.GetPokemonByName(this.Evo).subscribe(
          (data) => {
            this.pokemon.evolution.next.push(data._id);
            resolve();
          },
          () => reject('Failed to fetch next evolution. Please try again.')
        );
      } else {
        resolve();
      }
    });
  }
  
  private setImageData(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.pokemon.image) {
        this.convertImageToBase64(this.pokemon.image)
          .then((base64Data) => {
            this.pokemon.img = base64Data;
            resolve();
          })
          .catch(() => reject('Failed to fetch and process image. Please try again.'));
      } else {
        resolve(); 
      }
    });
  }
  
  private savePokemon(): void {
    this.addService.AddPokemon(this.pokemon).subscribe(
      () => {
        this.successMessage = `${this.pokemon.name} has been added successfully!`;
        console.log(this.pokemon);
        this.errorMessage = null;
        this.resetForm();
      },
      () => {
        this.errorMessage = 'Failed to add Pokémon. Please try again.';
        this.successMessage = null;
      }
    );
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
      image: '',
      img: '' 
    };
  }
  
  private convertImageToBase64(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result as string); 
        };
        reader.onerror = reject;
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.responseType = 'blob';
      xhr.open('GET', imageUrl);
      xhr.send();
    });
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
