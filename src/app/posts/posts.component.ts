import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  private url: string = 'http://jsonplaceholder.typicode.com/posts';

  posts: any[] = [];

  constructor(private http: HttpClient) {
    http.get(this.url)
      .subscribe(data => {
        this.posts = JSON.parse(JSON.stringify(data));
        console.log(this.posts);
      });
  }

  createPost(input: HTMLInputElement) {
      let post: any = { title: input.value };
      input.value = '';

      this.http.post(this.url, JSON.stringify(post))
        .subscribe(data => {
          let response = JSON.parse(JSON.stringify(data));
          post['id'] = response.id;
          this.posts.splice(0, 0, post);
          console.log(response);
        });
  }
}
