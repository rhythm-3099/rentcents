import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import { AuthService } from '../auth/auth.service';

import {User_item_service} from "../services/user_item.service";

@Component({
    selector: 'app-updateuserprofile',
    templateUrl: './updateuserprofile.component.html',
    styleUrls: ['./updateuserprofile.component.css']
})

export class UpdateUserProfileComponent{
  //isLoading = true;
  statusMessage = "";
  constructor(public authservice: AuthService){}
  onUpdate(form: NgForm){
    if(form.invalid) {
      return;
    }
    if(isNaN(Number(form.value.mob))){
      alert('Please Enter Valid Phone Number.')
      return;
    }
    let str: String = form.value.mob;
    if(str.length != 10){
      alert('Please Enter Valid Phone Number.')
      return;
    }
    if(form.value.password != form.value.cn_password){
      alert("Password and confirm password mismatch.");
      return;
    }
    //this.isLoading = true;
    this.authservice.updateUserInfo(form.value.email,form.value.password,form.value.f_name + " " + form.value.l_name, form.value.mob, form.value.address)
      .subscribe(data => {
        console.log("user info updated");
        this.statusMessage = "y";

        if(this.statusMessage == "y"){
          //this.isLoading = false;
        }
      }), error => {
        this.statusMessage == "n";
        console.log("Error updating the user info! :(");
      }
  }
}
