import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];

  constructor(private service: PostService) {
  }

  ngOnInit(): void {
    this.service.getPosts()
      .subscribe(data => {
        this.posts = JSON.parse(JSON.stringify(data));
      });
  }

  createPost(input: HTMLInputElement) {
      let post: any = { title: input.value };
      input.value = '';

      this.service.createPost(post)
        .subscribe(data => {
          let response = JSON.parse(JSON.stringify(data));
          post['id'] = response.id;
          this.posts.splice(0, 0, post);
          console.log(response);
        });
  }

  updatePost(post: any) {
    this.service.updatePost(post)
      .subscribe(data => {
        let response = JSON.parse(JSON.stringify(data));
        console.log(response);
      });
  };

  deletePost(post:any) {
    this.service.deletePost(post.id)
      .subscribe(data => {
        let response = JSON.parse(JSON.stringify(data));
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      })
  }
}
