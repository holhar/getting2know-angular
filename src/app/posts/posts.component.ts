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
    this.service.getAll().subscribe(posts => this.posts = posts);
  }

  createPost(input: HTMLInputElement) {
      let post: any = { title: input.value };
      input.value = '';

      this.service.create(post)
        .subscribe(response => {
          post['id'] = response.id;
          this.posts.splice(0, 0, post);
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
    this.service.update(post).subscribe(response => console.log(response));
  };

  deletePost(post:any) {
    this.service.delete(post.id)
      .subscribe(response => {
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
