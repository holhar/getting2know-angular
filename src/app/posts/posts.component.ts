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
      // Add post optimistically
      this.posts.splice(0, 0, post);

      input.value = '';

      this.service.create(post)
        .subscribe(response => {
          post['id'] = response.id;
        }, 
        (error: AppError) => {
          // Remove post again, if the request failed
          this.posts.splice(0, 1);
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
    // Remove post optimistically
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.delete(post.id)
      .subscribe(
      null, 
      (error: AppError) => {
        // Rollback deletion in case of failing delete request
        this.posts.splice(index, 0, post);
        if (error instanceof NotFoundError) {
          alert('This post has already been deleted');
        } else {
          // Rethrow error so that it will be handled by our AppErrorHandler
          throw error;
        }
      })
  }
}
