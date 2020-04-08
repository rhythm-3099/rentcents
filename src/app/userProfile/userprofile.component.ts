import {Component, OnInit, OnDestroy} from "@angular/core";
import {NgForm} from "@angular/forms";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {Search_service} from "../services/search.service";
import { User } from 'app/services/user.model';
import { AuthService } from 'app/auth/auth.service';
import { Product } from 'app/services/product.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.css']
})

export class UserProfileComponent implements OnInit, OnDestroy{
  currentUser: User;
  currentUserEmail: string;
  title: string;
  wishlist = [];
  addedProducts = [];
  public isLoading = true;
  constructor(public search_service: Search_service, private authService: AuthService, private router: Router){}

  async ngOnInit(){
    this.currentUserEmail = this.authService.getAuthData().userEmail;
    this.search_service.getUserObject(this.currentUserEmail).subscribe(data => {
      this.currentUser = data;
      //console.log(this.currentUser._id);
      this.search_service.getWishlistExpanded(this.currentUser._id).subscribe(response => {
        if(response.message == 'fetched successfully'){
          this.wishlist = response.docs;
        }
        //console.log('userid ', this.authService.getAuthData().userId);

        this.search_service.getAddedProducts(this.authService.getAuthData().userId).subscribe(val => {
          if(val.message == 'empty here') {
            //console.log('herererererer  ????');

            this.addedProducts = [];
          } else {
            //console.log('Orrrrrrrrrr  herererererer  ???? ', val.product);
            this.addedProducts = val.product;
          }
          //console.log('addedProducts ', this.addedProducts);

          if(this.currentUser){
            this.title="Hello "+this.currentUser.userName.toUpperCase();
            this.isLoading = false;
          }
        });
      });
    }, error => {
      console.log(error);
    });

  }

  ngOnDestroy(){

  }

  viewProduct(product: Product){
    this.router.navigate(['/viewproduct', product._id]);
  }

  deleteProduct(product: Product) {
    //console.log('id of deleting product ', product._id);

    this.search_service.deleteProduct(product._id).subscribe(data => {
      alert('product deleted, refresh the page');
      this.ngOnInit();
      this.router.navigate(['/userprofile']);
    })
  }

  removeFromWishlist(product: Product){
    let itr = 0;
    let startPos = 0;
    for(itr = 0; itr<this.wishlist.length; itr++) {
      if((this.wishlist[itr])._id == product._id){
        this.wishlist.splice(itr,1);
        break;
      }
      //console.log('itr ', itr, ' wishlist ', this.wishlist[itr], ' product ', product._id);

    }
    //console.log('updated array for removal ', this.wishlist);

    let userid = this.authService.getAuthData().userId;
    this.search_service.addToWishlist(this.wishlist, userid).subscribe(data => {
      if(data.message == "Wishlist Updated successfully"){
        alert("Wishlist updated! :)");
        //console.log(data.doc);
        this.ngOnInit();
      } else {
        alert("data.message");
      }
    });
  }
}
