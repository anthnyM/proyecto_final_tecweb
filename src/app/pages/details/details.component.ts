import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowseService } from '../../services/browse.service';
import { Pokemon } from '../../models/pokemon';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  pokemon!: Pokemon;
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


  goBack(): void{
    this.location.back();
  }
}
