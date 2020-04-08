import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { User_item_service } from "../services/user_item.service";
import { mimeType } from "../uploadItem/mime-type.validator";

@Component({
  selector: 'app-updateitem',
  templateUrl: './updateuseritem.component.html',
  styleUrls: ['./updateuseritem.component.css']
})
export class UploadItemComponent implements OnInit{

  catef;
  categ;
  cat_main = ["Real Estate","Vehicles","Electronics","Sports","Hobby","Books","Educational","Clothing","Furniture","Other"];
  cat_sub = ["Laptop","mobile","Pendrives/hard-disks","Computer accessories","Home entertainment","Televisions","camera accessories","projecters","Security cameras","Cameras","Printers and scanners","Other"];
  form: FormGroup;
  imagePreview: string;

  constructor(public user_item_service: User_item_service, private _snackBar: MatSnackBar) {}

  ngOnInit() {
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

  onUpdate() {
    console.log(this.form.value.name,this.form.value.description,this.form.value.price,this.form.value.city,this.form.value.state,this.form.value.main_category,this.form.value.sub_category);
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value.main_category,this.form.value.sub_category);
    //console.log(form.value.name,form.value.description,form.value.price,form.value.city,form.value.state,form.value.main_category,form.value.sub_category);
    this.user_item_service.updateProduct(this.form.value.name,this.form.value.description,this.form.value.price,this.form.value.city,this.form.value.state,this.form.value.main_category,this.form.value.sub_category, this.form.value.image);//,form.value.city,form.value.state,form.value.main_category,form.value.sub_category);
    //git staconst message = 'Item added!!';
    this._snackBar.open('Item updated', 'Okay', {
      duration: 3000
    });
    this.form.reset();
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
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
