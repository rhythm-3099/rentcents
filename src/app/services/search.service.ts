import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.model';
import { NullTemplateVisitor } from '@angular/compiler';

export interface ProductID{
  id : string;
}

@Injectable({providedIn: 'root'})
export class Search_service  {
  private product: Product ;
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
        this.productUpdated.next(this.product);
        //console.log(this.product);
      });
      //console.log('riii ', this.posts);

  }

  getProductUpdateListener() {
    return this.productUpdated.asObservable();
  }

}
