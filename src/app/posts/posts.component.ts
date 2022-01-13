import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  private url: string = 'http://jsonplaceholder.typicode.com/posts';

  posts: any[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get(this.url)
      .subscribe(data => {
        this.posts = JSON.parse(JSON.stringify(data));
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

  updatePost(post: any) {
    //this.http.put(this.url, JSON.stringify(post))
    this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }))
      .subscribe(data => {
        let response = JSON.parse(JSON.stringify(data));
        console.log(response);
      });
  };

  deletePost(post:any) {
    this.http.delete(this.url + '/' + post.id)
      .subscribe(data => {
        let response = JSON.parse(JSON.stringify(data));
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      })
  }
}
