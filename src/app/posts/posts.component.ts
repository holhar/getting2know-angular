import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: any[] = [];

  constructor(http: HttpClient) {
    http.get('http://jsonplaceholder.typicode.com/posts')
      .subscribe(data => {
        this.posts = JSON.parse(JSON.stringify(data));
        console.log(this.posts);
      });
  }
}
