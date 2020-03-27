import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.model';
import { AuthService } from '../auth/auth.service';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Capability } from 'protractor';

@Injectable({providedIn: 'root'})
export class User_item_service  {
  private posts: Product[] = [];
  private postsUpdated = new Subject<{posts: Product[], postCount: number}>();

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient,public authService: AuthService, private router: Router) {}

  //**************************************************************************************************************

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    console.log(queryParams);


    this.http.get<{message: string, posts: any, maxPosts: number}>('http://localhost:3000/api/product' + queryParams)
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
              sub_cateegory: post.sub_cateegory,
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
      });
      //console.log('riii ', this.posts);



  }

  // getVehiclePosts(postsPerPage: number, currentPage: number) {
  //   const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
  //   console.log(queryParams);


  //   this.http.get<{message: string, posts: any, maxPosts: number}>('http://localhost:3000/api/category/vehicle' + queryParams)
  //     .pipe(
  //       map(postData => {
  //         return { posts: postData.posts.map(post => {
  //           return {
  //             _id: post._id,
  //             name: post.name,
  //             description: post.description,
  //             price : post.price,
  //             city: post.city,
  //             state: post.state,
  //             main_category: post.main_category,
  //             sub_cateegory: post.sub_cateegory,
  //             imagePath: post.imagePath,
  //             owner: post.owner,
  //             owner_name: post.owner_name,
  //             rating: post.rating,
  //           }
  //         }),
  //         maxPosts: postData.maxPosts};
  //       })
  //     )
  //     .subscribe((transformedPostData) => {
  //       this.posts = transformedPostData.posts;
  //       this.postsUpdated.next(
  //         { posts: [...this.posts],
  //           postCount: transformedPostData.maxPosts
  //         }
  //       );
  //     });
  //     //console.log('riii ', this.posts);



  // }

  //**************************************************************************************************************

  endpoint: string = 'http://localhost:3000/api/product';

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  //**************************************************************************************************************

  addProduct(name: string, description: string, price: string, city: string, state: string, main_category: string, sub_category: string, image: File) { //, city: string, state: string, main_category: string, sub_cateegory: string){
    //const product: Product = {_id:null, name: name,  description: description , price: price, city: city , state: state , main_category: main_category, sub_category: sub_category, userId: this.authService.userId}//};
    //console.log(product);
    const postData = new FormData();
    postData.append("name", name);
    postData.append("price", price);
    postData.append("description", description);
    postData.append("city", city);
    postData.append("state", state);
    postData.append("main_category", main_category);
    postData.append("sub_category", sub_category);
    postData.append("image", image, name);
    postData.append("userId", this.authService.userId);
    postData.append("userName", this.authService.userName);

    this.http
        .post<{message: string, post: Product}>('http://localhost:3000/api/product',postData)
        .subscribe(responseData => {
          // const product: Product = {
          //   _id: responseData.post._id,
          //   name: responseData.post.name,
          //   price: responseData.post.price,
          //   description: responseData.post.description,
          //   city: responseData.post.city,
          //   state: responseData.post.state,
          //   main_category: responseData.post.main_category,
          //   sub_category: responseData.post.sub_category,
          //   imagePath: responseData.post.imagePath,
          //   owner_id: responseData.post.owner_id,
          //   owner_name: responseData.post.owner_name,
          //   rating: responseData.post.rating
          // }

          // console.log(responseData.message);
          // // const postId = responseData.postId;
          // // product._id = postId;
          // console.log(product);
          // this.posts.push(product);
          // this.postsUpdated.next([...this.posts]);
          this.router.navigate(['/']);
        });
    console.log('here');

  }
}
