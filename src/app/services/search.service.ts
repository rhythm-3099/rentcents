import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Product } from './product.model';
import { NullTemplateVisitor } from '@angular/compiler';
import { User } from './user.model';
import "rxjs/add/operator/catch";
import "rxjs/add/Observable/throw";

export interface ProductID{
  id : string;
}

@Injectable({providedIn: 'root'})
export class Search_service  {
  public user: User;
  private product: Product ;
  private updatedProduct: Product;
  private productUpdated = new Subject<Product>();

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) {}

  getProduct(id : String) {
   // const productId : ProductID = { id : id};
   console.log(id + " hii");
   console.log('http://localhost:3000/api/product/:' + id);
    this.http.get<{message: string, product: Product}>('http://localhost:3000/api/product/' + id)
      .subscribe((productData) => {
        this.product = productData.product;
        this.updatedProduct = productData.product;
        this.productUpdated.next(this.product);
        //console.log(this.product);
      });
      //console.log('riii ', this.posts);

  }

  // getProduct(id : String): Observable<Product>{
  //   // const productId : ProductID = { id : id};
  //   return this.http.get<Product>("http://localhost:3000/api/product/:" + id);
  // }

  updateProductComments(id: string, comments: string[]) {
    this.updatedProduct.comments = comments;
    this.http.put("http://localhost:3000/api/product/" + id, this.updatedProduct)
      .subscribe(response => {
        console.log('product comment updated, from search.service');
      });
  }

  getProductUpdateListener() {
    return this.productUpdated.asObservable();
  }

  getUserObject(email: string): Observable<User>{
    // this.http.get<{user: User}>("http://localhost:3000/api/user/" + email)
    //   .subscribe(response => {
    //     this.user = response.user;
    //   })
    // return this.user;

    return this.http.get<User>("http://localhost:3000/api/user/" + email)
      .catch(this.getUserObjectErrorHandler);
  }

  getUserObjectErrorHandler (error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error");
  }

  

}
