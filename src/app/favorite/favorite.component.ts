import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input('is-favorite') isSelected: boolean = false;
  @Output() change = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.isSelected = !this.isSelected;
    this.change.emit({ newValue: this.isSelected });
  }

}

export interface FavoriteChangedEventArgs {
  newValue: boolean
}
