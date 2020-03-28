import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.model';
import { AuthService } from '../auth/auth.service';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Capability } from 'protractor';

@Injectable({providedIn: 'root'})
export class Realestate_category_service  {
  private posts: Product[] = [];
  private postsUpdated = new Subject<{posts: Product[], postCount: number}>();
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient,public authService: AuthService, private router: Router) {}

  getRealestatePosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    console.log(queryParams);


    this.http.get<{message: string, posts: any, maxPosts: number}>('http://localhost:3000/api/category/realestate' + queryParams)
      .pipe(
        map(postData => {
          return { posts: postData.posts.map(post => {
            return {
              _id: post._id,
              name: post.name,
              description: post.description,
              price : post.price,
              city: post.city,
              state: post.state,
              main_category: post.main_category,
              sub_category: post.sub_category,
              imagePath: post.imagePath,
              owner: post.owner,
              owner_name: post.owner_name,
              rating: post.rating,
            }
          }),
          maxPosts: postData.maxPosts};
        })
      )
      .subscribe((transformedPostData) => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next(
          { posts: [...this.posts],
            postCount: transformedPostData.maxPosts
          }
        );
        console.log(this.posts);
      });
      //console.log('riii ', this.posts);



  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
}
