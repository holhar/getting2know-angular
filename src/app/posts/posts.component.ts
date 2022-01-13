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
      }, 
      error => {
        alert('An unexpected error occurred.');
        console.log(error);
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
        }, 
        (error: Response) => {
          if (error.status === 400) {
            // this.form.setError(error.json())
          } else {
            alert('An unexpected error occurred.');
            console.log(error);
          }
        });
  }

  updatePost(post: any) {
    this.service.updatePost(post)
      .subscribe(data => {
        let response = JSON.parse(JSON.stringify(data));
        console.log(response);
      }, 
      error => {
        alert('An unexpected error occurred.');
        console.log(error);
      });
  };

  deletePost(post:any) {
    this.service.deletePost(post.id)
      .subscribe(data => {
        let response = JSON.parse(JSON.stringify(data));
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      }, 
      (error: Response) => {
        if (error.status === 404) {
          alert('This post has already been deleted');
        } else {
          alert('An unexpected error occurred.');
        }
        console.log(error);
      })
  }
}
