import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';

@Injectable({providedIn: 'root'})
export class User_item_service  {
  private posts: Product[] = [];
  private postsUpdated = new Subject<Product[]>();

  constructor(private http:HttpClient) {}

  getPosts() {
    this.http.get<{message: string, products: Product[] }>('http://localhost:3000/api/product')
      .subscribe((productdata) => {
        this.posts = productdata.products;
        this.postsUpdated.next([...this.posts]);
      });
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addProduct(name: string,  price: string, description: string, city: string, state: string, main_category: string, sub_category: string) { //, city: string, state: string, main_category: string, sub_cateegory: string){
    const product: Product = {id:null, name: name,  price: price , description: description , city: city , state: state , main_category: main_category, sub_category: sub_category}//};
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
