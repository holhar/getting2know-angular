import { Component } from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  isFilled: boolean = false;

  constructor() { }

  onClick() {
    this.isFilled = !this.isFilled;
  }

}
