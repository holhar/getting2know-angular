import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url: string = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(this.url).pipe(catchError(this.handleError));
  }

  createPost(post: any) {
    return this.http.post(this.url, JSON.stringify(post)).pipe(catchError(this.handleError));
  }

  updatePost(post: any) {
    //this.http.put(this.url, JSON.stringify(post))
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true })).pipe(catchError(this.handleError));
  }

  deletePost(id: number) {
    return this.http.delete(this.url + '/' + id).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    if (error.status === 404) {
      return throwError(new NotFoundError());
    } else if (error.status === 400) {
      return throwError(new BadRequestError(error.json()));
    }
    return throwError(new AppError(error));
  }
}
