import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Product } from '../services/product.model';
import { AuthService } from '../auth/auth.service';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { WebService} from '../services/websocket.service';
import { Subscription } from 'rxjs';

export interface urlLink {
  url : string;
  success : boolean
  ;
}

@Component({
  selector: 'app-bookproduct',
  templateUrl: './bookproduct.component.html',
  styleUrls: ['./bookproduct.component.css']
})
export class BookproductComponent implements OnInit {

  private urlsub: Subscription;

  product: Product;
  userName : string;
  userEmail : string;
  url_payment : string;
  flag_ = false;
  res : urlLink;

  private linksub: Subscription;
  constructor(private router: Router, private authService: AuthService) {
    this.product = this.router.getCurrentNavigation().extras.state.product;
    console.log(this.product);
    this.userName = this.authService.userName;
    this.userEmail = this.authService.userEmail;
   }

   payment(){
    this.flag_ = true;
    var reqBody = {
      name : this.product.name,
      price : this.product.price ,
      discription : this.product.description
    }
    console.log(reqBody);

    this.authService.paymentRequest(reqBody)
    .subscribe( res =>{
      if(!res.success){
        //this.flashMessages.show( res.url ,{cssClass: 'alert-danger' ,timeout :4000});
      }else{
        console.log("res "+ res);
        // this.url_show = true;
        console.log(res.url);
        this.url_payment = res.url;
        this.flag_ = true;
      }
      // this.refreshData();
     // this.webService.refreshRealtime();
    });
    // console.log("payment");
  }

   bookProduct(){

   }
  ngOnInit(): void {
  }
  do1(){

  }
  chat1(){

  }
  email1(){

  }

}
