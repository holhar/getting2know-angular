import { Component, OnInit } from '@angular/core';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';
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
        }, 
        (error: AppError) => {
          if (error instanceof BadRequestError) {
            //this.form.setError(error.originalError)
          } else {
            // Rethrow error so that it will be handled by our AppErrorHandler
            throw error;
          }
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
      }, 
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert('This post has already been deleted');
        } else {
          // Rethrow error so that it will be handled by our AppErrorHandler
          throw error;
        }
      })
  }
}
