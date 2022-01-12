import { Component } from '@angular/core';
import { FavoriteChangedEventArgs } from './favorite/favorite.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Getting to know Angular';
  wishes = [1, 2];

  post = {
    title: "Title",
    isFavorite: true
  };

  tweet = {
    body: '...',
    likesCount: 10,
    isLiked: false
  };

  onFavoriteChanged(eventArgs: FavoriteChangedEventArgs) {
    console.log("Favorite changed: ", eventArgs);
  }
}
