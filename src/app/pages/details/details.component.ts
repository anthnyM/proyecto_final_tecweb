import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowseService } from '../../services/browse.service';
import { Pokemon } from '../../models/pokemon';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  pokemon!: Pokemon;
  isEditing: Boolean = false;
  preEvolution: any = null;
  nextEvolution: any[] = [];

  constructor(private route: ActivatedRoute, private browseService: BrowseService, private location: Location, private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.resetState();
        this.loadPokemon(id);
      }
    });
  }

  resetState(): void {
    this.pokemon = null;
    this.preEvolution = null;
    this.nextEvolution = [];
  }

  loadPokemon(id: string): void {
    this.browseService.getPokemonById(id).subscribe((data) => {
      this.pokemon = data;
      this.loadEvolutions();
    });
  }

  loadEvolutions(): void{
    if(this.pokemon.evolution.prev){
      this.browseService.getPokemonById(this.pokemon.evolution.prev).subscribe(
        (data) => (
          this.preEvolution = data
        )
      );
    }
    if (this.pokemon.evolution.next.length > 0) {
      this.pokemon.evolution.next.forEach((evolutionId: string) => {
        this.browseService.getPokemonById(evolutionId).subscribe((data) => {
          this.nextEvolution.push(data);
        });
      });
    }
  }

  navigateToEvolution(id: string): void {
    this.router.navigate(['/details/', id]);
  }

  deletePokemon(): void {
    if (confirm(`Are you sure you want to delete ${this.pokemon.name}?`)) {
      this.browseService.deletePokemonById(this.pokemon._id).subscribe(() => {
        alert(`${this.pokemon.name} has been deleted.`);
        this.router.navigate(['/browse']);
      });
    }
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  saveChanges(): void {
    const updates = {
      name: this.pokemon.name,
      type: this.pokemon.type,
      base: this.pokemon.base,
      legendary: this.pokemon.legendary,
    };
    console.log(updates);
    this.browseService.patchPokemonById(this.pokemon._id, updates).subscribe(
      (updatedPokemon) => {
        this.pokemon = updatedPokemon; 
        this.isEditing = false;
        alert('Pokemon updated successfully!');
      },
      (error) => {
        console.error('Error updating Pokémon:', error);
        alert('Failed to update Pokémon.');
      }
    );
  }

  goBack(): void{
    this.location.back();
  }
}
