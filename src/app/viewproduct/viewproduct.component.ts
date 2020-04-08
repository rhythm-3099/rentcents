import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';
import { Search_service } from '../services/search.service';
import { Product } from '../services/product.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from "../uploadItem/mime-type.validator";
import { User_item_service } from 'app/services/user_item.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  showUpdateCardField = false;
  private authListenerSubs: Subscription;

  catef;
  categ;
  cat_main = ["Real Estate","Vehicles","Electronics","Sports","Hobby","Books","Educational","Clothing","Furniture","Other"];
  cat_sub = ["Laptop","mobile","Pendrives/hard-disks","Computer accessories","Home entertainment","Televisions","camera accessories","projecters","Security cameras","Cameras","Printers and scanners","Other"];
  form: FormGroup;
  imagePreview: string;


  constructor(public serach_service : Search_service,private router: Router,private authService: AuthService, private activatedRoute: ActivatedRoute, public user_item_service: User_item_service, private _snackBar: MatSnackBar) {
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

    this.form = new FormGroup({
      'name' : new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      'price' : new FormControl(null, {
        validators: [Validators.required]
      }),
      'description' : new FormControl(null, {
        validators: [Validators.required]
      }),
      'city' : new FormControl(null, {
        validators: [Validators.required]
      }),
      'state' : new FormControl(null, {
        validators: [Validators.required]
      }),
      'main_category' : new FormControl(null, {
        validators: [Validators.required]
      }),
      'sub_category' : new FormControl(null, {
        validators: [Validators.required]
      }),
      'image' : new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})

    });
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

  showUpdateCard(){
    this.showUpdateCardField = true;
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

  deleteProduct(product: Product) {
    //console.log('id of deleting product ', product._id);

    this.serach_service.deleteProduct(product._id).subscribe(data => {
      alert('product deleted, refresh the page');
      this.ngOnInit();
      this.router.navigate(['/userprofile']);
    })
  }



  //*********************************************************************************************

  onUpload() {
    console.log(this.form.value.name,this.form.value.description,this.form.value.price,this.form.value.city,this.form.value.state,this.form.value.main_category,this.form.value.sub_category);
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value.main_category,this.form.value.sub_category);
    //console.log(form.value.name,form.value.description,form.value.price,form.value.city,form.value.state,form.value.main_category,form.value.sub_category);
    this.user_item_service.updateProduct(this.product_id, this.form.value.name,this.form.value.description,this.form.value.price,this.form.value.city,this.form.value.state,this.form.value.main_category,this.form.value.sub_category, this.form.value.image)//,form.value.city,form.value.state,form.value.main_category,form.value.sub_category);
      .subscribe(data => {
        this._snackBar.open(data.message, 'Okay', {
          duration: 3000
        });
        this.form.reset();
        this.router.navigate(['/userprofile']);
      })
    //git staconst message = 'Item added!!';

  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity()
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    // console.log(file);
    // console.log(this.form);
  }

  categories = [

    {value: 'Real Estate-0', viewValue: "Real Estate"},
    {value: 'Vehicles-1', viewValue: 'Vehicles'},
    {value: 'Electronics-2', viewValue: 'Electronics'},
    {value: 'Sports-3', viewValue: 'Sports'},
    {value: 'Hobby-4', viewValue: 'Hobby'},
    {value: 'Books-5', viewValue: 'Books'},
    {value: 'Educational-6', viewValue: 'Educational'},
    {value: 'Clothing-7', viewValue: 'Clothing'},
    {value: 'Furniture-8', viewValue: 'Furniture'},
    {value: 'Other-9', viewValue: 'Other'}

  ];

  findSUB(){
    this.catef = this.form.value.main_category;
    if(this.catef == "Vehicles")this.cat_sub = ["2-wheeler-Luxury","2-wheeler-Regular","4-wheeler-SUV","4-wheeler-Sedan","4-wheeler-HatchBack","Other"];
    if(this.catef == "Real Estate")this.cat_sub = ["Residential","Commercial","Other"];
    if(this.catef == "Electronics")this.cat_sub = ["Laptop","mobile","Pendrives/hard-disks","Computer accessories","Home entertainment","Televisions","camera accessories","projecters","Security cameras","Cameras","Printers and scanners","Other"];
    if(this.catef == "Sports")this.cat_sub = ["Indoor","Outdoor","Gymnasium","Other"];
    if(this.catef == "Hobby")this.cat_sub = ["Singing equipment","Dance equipment","Others"];
    if(this.catef == "Books")this.cat_sub = ["Love stories","NCRT books","Horror","History","Others"];
    if(this.catef == "Educational")this.cat_sub = ["Reference Books","Journals","Magazines","Notebooks","CDs","Other"];
    if(this.catef == "Clothing")this.cat_sub = ["Men","Women","Children","Other"];
    if(this.catef == "Furniture")this.cat_sub = ["Beds and wardrobes","Sofa and dining","Home Decor","Other"];
    // this.flag= true;
  }

}
