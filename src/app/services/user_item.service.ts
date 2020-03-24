import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.model';
import { AuthService } from '../auth/auth.service';
import { NullTemplateVisitor } from '@angular/compiler';

@Injectable({providedIn: 'root'})
export class User_item_service  {
  private posts: Product[] = [];
  private postsUpdated = new Subject<Product[]>();

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient,public authService: AuthService) {}

  getPosts() {
    // this.http.get<{message: string, products: Product[] }>('http://localhost:3000/api/product')
    //   .subscribe((productdata) => {
    //     this.posts = productdata.products;
    //     this.postsUpdated.next([...this.posts]);
    //   });
    // return [...this.posts];




    //**************************************************************************************************************

    this.http.get<{message: string, posts: Product[]}>('http://localhost:3000/api/product')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
      //console.log('riii ', this.posts);



  }

  // getPosts() {
  //   console.log('useritem');

  //   this.http.get<{message: string, posts: Product[]}>('http://localhost:3000/api/product')
  //     .subscribe((postData) => {
  //       this.posts = postData.posts;
  //       this.postsUpdated.next([...this.posts]);
  //     });
  // }
  endpoint: string = 'http://localhost:3000/api/product';

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }


  addProduct(name: string, description: string, price: string, city: string, state: string, main_category: string, sub_category: string) { //, city: string, state: string, main_category: string, sub_cateegory: string){
    const product: Product = {id:null, name: name,  description: description , price: price, city: city , state: state , main_category: main_category, sub_category: sub_category, userId: this.authService.userId, rating : ""};
    console.log(product);
    this.http
        .post<{message: string}>('http://localhost:3000/api/product',product)
        .subscribe(responseData => {
          console.log(responseData.message);
          this.posts.push(product);
          this.postsUpdated.next([...this.posts]);
        });
    console.log('here');

  }
}
