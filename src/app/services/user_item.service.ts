import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.model';
import { AuthService } from '../auth/auth.service';

import { map } from 'rxjs/operators';
import { Capability } from 'protractor';

@Injectable({providedIn: 'root'})
export class User_item_service  {
  private posts: Product[] = [];
  private postsUpdated = new Subject<Product[]>();

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient,public authService: AuthService) {}

  //**************************************************************************************************************

  getPosts() {



    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/product')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            _id: post._id,
            name: post.name,
            description: post.description,
            city: post.city,
            state: post.state,
            main_category: post.main_category,
            sub_cateegory: post.sub_cateegory,
            owner: post.owner,
            rating: post.rating,
            imagePath: post.imagePath
          }
        });
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
      //console.log('riii ', this.posts);



  }

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

    this.http
        .post<{message: string, post: Product}>('http://localhost:3000/api/product',postData)
        .subscribe(responseData => {
          const product: Product = {
            id: responseData.post.id,
            name: name,
            price: price,
            description: description,
            city: city,
            state: state,
            main_category: main_category,
            sub_category: sub_category,
            imagePath: responseData.post.imagePath
          }
          console.log(responseData.message);
          // const postId = responseData.postId;
          // product._id = postId;
          console.log(product);
          this.posts.push(product);
          this.postsUpdated.next([...this.posts]);
        });
    console.log('here');

  }
}
