import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  query = '';
  @Output() search = new EventEmitter<string>();

  submit() {
    this.search.emit(this.query);
  }
}
