import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { RouterModule } from "@angular/router";
import {PageEvent} from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Product } from '../services/product.model';
import { Hobby_category_service } from '../services/hobby_category.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
export interface product {

  Name: string;
}

@Component ({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.css']
})

export class HobbyComponent implements OnInit, OnDestroy{
  searchterm: string;
  search: string;
  posts: Product[] = [];
  private postsSub: Subscription;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  // totalPosts=10;
  // postsPerPage=4;
  // currentPage = 1;
  // pageSizeOptions = [4,8,12];

  constructor(public postsService: Hobby_category_service,private router: Router,private authService: AuthService) {

  }

  ngOnInit() {
    // console.log('1) ');

    this.postsService.getHobbyPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((productData: {posts: Product[], postCount: number}) => {
        this.posts = productData.posts;
        //console.log(this.posts);
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    }) ;
    //   console.log('2) ');
    // console.log('homeComponent ', this.posts);
  }

  // onChangedPage(pageData: PageEvent){
  //   console.log(pageData);
  //   this.currentPage = pageData.pageIndex + 1;
  //   this.postsPerPage = pageData.pageSize;
  //   this.postsService.getHobbyPosts(this.postsPerPage,this.currentPage);
  // }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  viewProduct(product: Product){
    this.router.navigate(['/viewproduct', product._id]);
  }

  book(){
    if(!this.userIsAuthenticated)
        this.router.navigate(['/login']);
      else
      this.router.navigate(['/bookproduct']);
  }

  gotoRealestate(){
    this.router.navigate(['/realestate']);
  }

  gotoVehicles(){
    this.router.navigate(['/vehicles']);
  }

  gotoElectronics(){
    this.router.navigate(['/electronics']);
  }

  gotoSports(){
    this.router.navigate(['/sports']);
  }

  gotoFurniture(){
    this.router.navigate(['/furniture']);
  }

  gotoBooks(){
    this.router.navigate(['/books']);
  }

  gotoEducational(){
    this.router.navigate(['/educational']);
  }

  gotoHobby(){
    this.router.navigate(['/hobby']);
  }

  gotoClothing(){
    this.router.navigate(['/clothing']);
  }

  gotoOthers(){
    this.router.navigate(['/others']);
  }

}
