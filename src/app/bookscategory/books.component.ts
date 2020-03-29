import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { RouterModule } from "@angular/router";
import {PageEvent} from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Product } from '../services/product.model';
import { Books_category_service } from '../services/books_category.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
export interface product {

  Name: string;
}

@Component ({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit, OnDestroy{
  searchterm: string;
  search: string
  posts: Product[] = [];
  private postsSub: Subscription;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  

  constructor(public postsService: Books_category_service,private router: Router,private authService: AuthService) {

  }

  ngOnInit() {
    this.postsService.getBooksPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((productData: {posts: Product[], postCount: number}) => {
        this.posts = productData.posts;
        
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    }) ;
  }

  // onChangedPage(pageData: PageEvent){
  //   console.log(pageData);
  //   this.currentPage = pageData.pageIndex + 1;
  //   this.postsPerPage = pageData.pageSize;
  //   this.postsService.getBooksPosts(this.postsPerPage,this.currentPage);
  // }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  viewProduct(id: string){
    this.router.navigate(['/viewproduct'], { state: { product_id: id } });
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
