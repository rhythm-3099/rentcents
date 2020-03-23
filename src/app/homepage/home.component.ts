<<<<<<< HEAD
import { Component,OnInit, OnDestroy } from "@angular/core";
=======
import { Component, Input, OnInit, OnDestroy } from "@angular/core";
>>>>>>> upstream/master
import { RouterModule } from "@angular/router";
import {PageEvent} from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Product } from '../services/product.model';
import { User_item_service } from '../services/user_item.service';

import { Product } from '../services/product.model';
import { User_item_service } from "../services/user_item.service";
import { Subscription } from 'rxjs';

@Component ({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
<<<<<<< HEAD

export class HomeComponent implements OnInit, OnDestroy {
  public pagedItems :  Product[] = [];
  private postsSub: Subscription;


constructor(public user_item_service: User_item_service){}


ngOnInit() {
  this.user_item_service.getPosts();
  this.postsSub = this.user_item_service.getPostUpdateListener()
      .subscribe((products: Product[]) => {
        this.pagedItems = products;
      });
  console.log(this.pagedItems);
}

onLogout() {

}

ngOnDestroy() {

  this.postsSub.unsubscribe();
}

/* pagedItems: Array<Product>  = [
=======
export class HomeComponent implements OnInit, OnDestroy{

  // products: Product[] = [{
  //   "name":"guitar",
  //   "description":"electric guitar",
  //   "price":"1500",
  //   "city":"ahm",
  //   "state":"guj",
  //   "id":"xyz",
  //   "main_category":"music",
  //   "sub_category":"electronic",
  //   "userId":"abc"
  // }];
  posts: Product[] = [];
  private postsSub: Subscription;





  constructor(public postsService: User_item_service) {

  }

  ngOnInit() {
    // console.log('1) ');

    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((products: Product[]) => {
        this.posts = products;
        console.log(this.posts);
      });
    //   console.log('2) ');
    // console.log('homeComponent ', this.posts);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }


  // pagedItem here is used just to check pager will habe all pageditems

  pagedItems: Array<product> = [
>>>>>>> upstream/master
    {
      Name: 'Name 1',
      price: 100

    },
    {
      price: 200,
      Name: 'Name 2'
    },
    {
      price: 300,
      Name: 'Name 3 '
    },
    {
      price: 400,
      Name: 'Name 4'
    },
    {
      price: 300,
      Name: 'Name 5 '
    },
    {
      price: 400,
      Name: 'Name 6'
    },
    {
      price: 400,
      Name: 'Name 6'
    }
  ];*/

    // array of all items to be paged
<<<<<<< HEAD
    private allItems: any[];
=======
    //private allItems: any[];
>>>>>>> upstream/master
// NOTE: here we have to fetch all the items from the server !! (not server side pagination)

    // pager object
    pager: any = {totalItems: 17,
      currentPage: 2,
      pageSize: 5,
      totalPages: 4,
      startPage: 3,
      endPage: 7,
      startIndex: 6,
      endIndex: 7,
      pages: [3,4,5,6,7]
    }
    // paged items
    //pagedItems: any[];
/*
    ngOnInit() {
        // get dummy data
        this.http.get('./dummy-data.json')
            .map((response: Response) => response.json())
            .subscribe(data => {
                // set items to json response
                this.allItems = data;
                // initialize to page 1
                this.setPage(1);
            });
    }
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
  */
}
