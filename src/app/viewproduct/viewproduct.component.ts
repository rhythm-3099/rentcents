import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';
import { Search_service } from '../services/search.service';
import { Product } from '../services/product.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit, OnDestroy {

  product: Product;
  private productsub: Subscription;
  private iterator = 0;
  isLoading = true;
  show1 = false;
  show2 = false;
  show3 = false;
  postcomments =[];
  comment;
  private product_id: string;
  userIsAuthenticated = false;
  username: string;
  userid: string;
  wishlist = [];
  private authListenerSubs: Subscription;


  constructor(public serach_service : Search_service,private router: Router,private authService: AuthService, private activatedRoute: ActivatedRoute) {
    this.product_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userIsAuthenticated = this.authService.getIsAuth();
      this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
      if(this.userIsAuthenticated) {
        this.username = this.authService.getAuthData().userName;
        this.userid = this.authService.getAuthData().userId;
        console.log('usrid here in view, ', this.userid);
        this.serach_service.getWishlist(this.userid).subscribe(data => {
          this.wishlist = data.docs;


          if(data.message == 'no products in the wishlist'){
            this.wishlist = [];
            console.log('are we here?');
          }
          console.log('moment of truth, ', this.wishlist);
        });
      }
    this.serach_service.getProduct(this.product_id);
    this.productsub = this.serach_service.getProductUpdateListener()
      .subscribe((product: Product) => {
        this.product = product;
        this.postcomments = product.comments;
        console.log("heyy there");
        console.log(this.product);

        if(this.product){
          this.isLoading = false;
        }
      });
      // this.userIsAuthenticated = this.authService.getIsAuth();
      // this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      //   this.userIsAuthenticated = isAuthenticated;
      // });
  }


  ngOnInit(): void {
    // this.serach_service.getProduct(this.product_id);
    // this.productsub = this.serach_service.getProductUpdateListener()
    //   .subscribe((product: Product) => {
    //     this.product = product;
    //     this.postcomments = product.comments;
    //     console.log("heyy there");
    //    console.log(this.product);
    //    this.username = this.authService.getAuthData().userName;
    //   });
    //   this.userIsAuthenticated = this.authService.getIsAuth();
    // this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
    //   this.userIsAuthenticated = isAuthenticated;
    // }) ;
  }

  ngOnDestroy(){
    this.serach_service.updateProductComments(this.product_id, this.postcomments);
    this.productsub.unsubscribe();
  }

  showButton(){
    if(this.show1)this.show1 = false;
    else
     {
       this.show1 = true;
       this.show2 = false;
       this.show3 = false;
     }
  }
  showButton2(){
    if(this.show2)
    this.show2 = false;
    else
     {
       this.show1 = false;
       this.show2 = true;
       this.show3 = false;
     }
  }
  showButton3(){
    if(this.show3)this.show3 = false;
    else
     {
       this.show1 = false;
       this.show2 = false;
       this.show3 = true;
     }
  }
  book(){
    if(!this.userIsAuthenticated)
        this.router.navigate(['/login']);
      else
        this.router.navigate(['/bookproduct'], { state: { product: this.product } });
  }
  doStuff(){
    this.router.navigate(['/userprofile']);
  }
  chat1(){

  }
  post1(){
    let newcomment = this.username + " : " + this.comment;
    this.postcomments.push(newcomment);
    this.comment='';
  }

  addToWishlist() {
    console.log('wishlist in viewproduct ', this.wishlist);

    // this.serach_service.getWishlist(this.userid).subscribe(data => {
    //   if(data.docs)
    //     this.wishlist = data.docs;
    //   // if(!this.wishlist){
    //   //   this.wishlist = [];
    //   // }
    //   // console.log("inside, wishlist: ", this.wishlist);
    //   // // console.log('product right now: ', this.product._id);
    //   // // console.log('wishing', this.wishlist);

    //   // //if(this.wishlist)
    //   // this.wishlist.push(this.product._id);
    //   // console.log("still inside, wishlist: ", this.wishlist);
    //   // this.serach_service.addToWishlist(this.wishlist, this.userid).subscribe(data => {
    //   //   if(data.message == "Wishlist Updated successfully"){
    //   //     alert("Wishlist updated! :)");
    //   //     console.log(data.doc);
    //   //   } else {
    //   //     alert("data.message");
    //   //   }
    //   // });
    // })

    console.log("inside, wishlist: ", this.wishlist);
      // console.log('product right now: ', this.product._id);
      // console.log('wishing', this.wishlist);

      //if(this.wishlist)
      //let alreadyAdded = false;
      for(this.iterator = 0; this.iterator < this.wishlist.length; this.iterator++){
        if(this.wishlist[this.iterator] == this.product._id){
          alert('This product is already in your wishlist!');
          return ;
        }
      }
      this.wishlist.push(this.product._id);
      console.log("still inside, wishlist: ", this.wishlist);
      this.serach_service.addToWishlist(this.wishlist, this.userid).subscribe(data => {
        if(data.message == "Wishlist Updated successfully"){
          alert("Wishlist updated! :)");
          console.log(data.doc);
        } else {
          alert("data.message");
        }
      });
  }
}
