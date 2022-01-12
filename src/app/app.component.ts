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
  recommendations: any;
  viewMode = 'map';

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

  onAdd() {
    this.recommendations.push({id: 4, name: 'recommendation4'});
  }

  onRemove(recommendation: any) {
    let index = this.recommendations.indexOf(recommendation);
    this.recommendations.splice(index, 1);
  }

  loadCourses() {
    this.recommendations = [
      { id: 1, name: 'recommendation1'},
      { id: 2, name: 'recommendation2'},
      { id: 3, name: 'recommendation3'},
    ]
  }

  trackRecommendation(index: number, recommendation: any) {
    return recommendation ? recommendation.id : undefined;
  }
}
