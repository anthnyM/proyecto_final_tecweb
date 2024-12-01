import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
})
export class PokemonComponent {
  @Input() data: Pokemon | null = null;
  @Output() selectedPokemon =  new EventEmitter<string>();

  onSelect(): void{
    console.log(this.data._id)
    this.selectedPokemon.emit(this.data._id);
  }
}
