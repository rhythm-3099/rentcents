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

  constructor(public user_item_service: User_item_service, private _snackBar: MatSnackBar) {}

  onUpload(form: NgForm) {
    console.log(form.value.name,form.value.description,form.value.price,form.value.city,form.value.state,form.value.main_category,form.value.sub_category);
    if (form.invalid) {
      return;
    }
    //console.log(form.value.name,form.value.description,form.value.price,form.value.city,form.value.state,form.value.main_category,form.value.sub_category);
    this.user_item_service.addProduct(form.value.name,form.value.description,form.value.price,form.value.city,form.value.state,form.value.main_category,form.value.sub_category);//,form.value.city,form.value.state,form.value.main_category,form.value.sub_category);
    git staconst message = 'Item added!!';
    this._snackBar.open('Item added', 'Okay', {
      duration: 3000
    });
    form.resetForm();
}

}
