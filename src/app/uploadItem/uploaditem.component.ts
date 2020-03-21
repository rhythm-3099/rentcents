import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { User_item_service } from "../services/user_item.service";

@Component({
  selector: 'app-uploaditem',
  templateUrl: './uploaditem.component.html',
  styleUrls: ['./uploaditem.component.css']
})
export class UploadItemComponent {

  catef;
  categ;
  cat_main = ["Real Estate","Vehicles","Electronics","Sports","Hobby","Books","Educational","Clothing","Furniture","Other"];
  cat_sub = ["Laptop","Pendrives/hard-disks","Computer accessories","Home entertainment","Televisions","camera accessories","projecters","Security cameras","Cameras","Printers and scanners","Other"];
  constructor(public user_item_service: User_item_service, private _snackBar: MatSnackBar) {}

  onUpload(form: NgForm) {
    console.log(form.value.name,form.value.description,form.value.price,form.value.city,form.value.state,form.value.catef,form.value.sub_category);
    if (form.invalid) {
      return;
    }
    console.log(form.value.main_category,form.value.sub_category);
    //console.log(form.value.name,form.value.description,form.value.price,form.value.city,form.value.state,form.value.main_category,form.value.sub_category);
    this.user_item_service.addProduct(form.value.name,form.value.description,form.value.price,form.value.city,form.value.state,form.value.main_category,form.value.sub_category);//,form.value.city,form.value.state,form.value.main_category,form.value.sub_category);
    //git staconst message = 'Item added!!';
    this._snackBar.open('Item added', 'Okay', {
      duration: 3000
    });
    form.resetForm();
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

findSUB(catef){
  if(catef == "Vehicles")this.cat_sub = ["2-wheeler-Luxury","2-wheeler-Regular","4-wheeler-SUV","4-wheeler-Sedan","4-wheeler-HatchBack","Other"];
  if(catef == "Real Estate")this.cat_sub = ["Residential","Commercial","Other"];
  if(catef== "Electronics")this.cat_sub = ["Laptop","Pendrives/hard-disks","Computer accessories","Home entertainment","Televisions","camera accessories","projecters","Security cameras","Cameras","Printers and scanners","Other"];
  if(catef == "Sports")this.cat_sub = ["Indoor","Outdoor","Gymnasium","Other"];
  if(catef == "Hobby")this.cat_sub = ["Singing equipment","Dance equipment","Others"];
  if(catef == "Books")this.cat_sub = ["Love stories","NCRT books","Horror","History","Others"];
  if(catef == "Educational")this.cat_sub = ["Reference Books","Journals","Magazines","Notebooks","CDs","Other"];
  if(catef == "Clothing")this.cat_sub = ["Men","Women","Children","Other"];
  if(catef == "Furniture")this.cat_sub = ["Beds and wardrobes","Sofa and dining","Home Decor","Other"];
  // this.flag= true;
}

}
