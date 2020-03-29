import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { RouterModule } from "@angular/router";
import {PageEvent} from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Product } from '../services/product.model';
import { User_item_service } from '../services/user_item.service';
import { AuthService } from '../auth/auth.service';

import { Router } from '@angular/router';
export interface product {

  Name: string;
}

@Component ({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
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
  totalPosts=10;
  postsPerPage=4;
  currentPage = 1;
  pageSizeOptions = [4,8,12];
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;



  constructor(public postsService: User_item_service,private router: Router,private authService: AuthService) {

  }

  ngOnInit() {
    // console.log('1) ');

    this.postsService.getPosts(this.postsPerPage,this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((productData: {posts: Product[], postCount: number}) => {
        this.posts = productData.posts;
        this.totalPosts = productData.postCount;
        //console.log(this.posts);
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    }) ;
    //   console.log('2) ');
    // console.log('homeComponent ', this.posts);
  }

  onChangedPage(pageData: PageEvent){
    console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  viewProduct(id: string){
    this.router.navigate(['/viewproduct'], { state: { product_id: id } });
  }

  // pagedItem here is used just to check pager will habe all pageditems

  pagedItems: Array<product> = [
    {
      Name: 'Real Estate',
    },
    {
      Name: 'Vehicle'
    },
    {
      Name: 'Electronics'
    },
    {
      Name: 'Sports'
    },
    {

      Name: 'Furniture'
    },
    {
      Name: 'Books'
    },
    {
      Name: 'Hobby'
    },
    {
      Name: 'Educational'
    },
    {
      Name: 'Clothing'
    },
    {
      Name: 'Others'
    }
  ];

   book(){
      if(!this.userIsAuthenticated)
        this.router.navigate(['/login']);
      else
      this.router.navigate(['/bookproduct']);  
   }
}
