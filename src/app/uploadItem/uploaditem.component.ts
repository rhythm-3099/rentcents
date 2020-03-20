import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';

import { User_item_service } from "../services/user_item.service";

@Component({
  selector: 'app-uploaditem',
  templateUrl: './uploaditem.component.html',
  styleUrls: ['./uploaditem.component.css']
})
export class UploadItemComponent {

  constructor(public user_item_service: User_item_service) {}

  onUpload(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.user_item_service.addProduct(form.value.name,form.value.description,form.value.price);
    form.resetForm();
}

}
