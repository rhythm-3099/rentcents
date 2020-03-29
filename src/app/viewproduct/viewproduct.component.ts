import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';
import { Search_service } from '../services/search.service';
import { Product } from '../services/product.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit, OnDestroy {

  product: Product;
  private productsub: Subscription;
  comment;
  username;

  isLoading = false;
  show1 = false;
  show2 = false;
  show3 = false;
  postcomment =[];
  private product_id: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;


  constructor(public serach_service : Search_service,private router: Router,private authService: AuthService) {
    this.product_id = this.router.getCurrentNavigation().extras.state.product_id;
  }

  ngOnInit(): void {
    this.serach_service.getProduct(this.product_id);
    this.productsub = this.serach_service.getProductUpdateListener()
      .subscribe((product: Product) => {
        this.product = product;
        console.log("heyy there");
       console.log(this.product);
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    }) ;
  }

  ngOnDestroy(){
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
      this.router.navigate(['/bookproduct']);
  }
  doStuff(){
    this.router.navigate(['/userprofile']);
  }
  chat1(){

  }
  post1(){
    this.postcomment.push({username: this.username,comment: this.comment});
    this.comment='';
  }
}
