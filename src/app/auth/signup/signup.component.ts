import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  isLoading = false;

  constructor(public authService: AuthService) {}


  onSignup(form: NgForm){
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
      this.isLoading = true;
      this.authService.createUser(form.value.email,form.value.password,form.value.f_name + " " + form.value.l_name, form.value.mob, form.value.address);
      //console.log(form.value);

  }
}
