import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Product } from '../services/product.model';
import { AuthService } from '../auth/auth.service';
import { WebService} from '../services/websocket.service';
import {  FlashMessagesService } from 'angular2-flash-messages';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookproduct',
  templateUrl: './bookproduct.component.html',
  styleUrls: ['./bookproduct.component.css']
})
export class BookproductComponent implements OnInit {

  product: Product;
  userName : string;
  userEmail : string;
  url_payment : string;
  flag_ = false;
  private linksub: Subscription;
  constructor(private router: Router, private authService: AuthService,private flashMessages : FlashMessagesService) {
    this.product = this.router.getCurrentNavigation().extras.state.product;
    this.userName = this.authService.userName;
    this.userEmail = this.authService.userEmail;
   }

   payment(){

    var reqBody = {
      name : this.product.name,
      price : this.product.price ,
      discription : this.product.description
    }
    console.log(reqBody);
    this.authService.paymentRequest(reqBody);/*
    this.linksub
    .subscribe( res =>{
      if(!res.success){
        this.flashMessages.show( res.url ,{cssClass: 'alert-danger' ,timeout :4000});
      }else{
        console.log("res "+ res);
        // this.url_show = true;
        this.url_payment = res.url;
        this.flag_ = true;
      }
      // this.refreshData();
     // this.webService.refreshRealtime();
    });*/
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
