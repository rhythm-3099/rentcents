import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  isLoading = false;
  validPassword="Aa123456";
  validUsername="abc@gmail.com";

  constructor(public authService: AuthService){}

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    if(form.value.password != this.validPassword){
      alert('Please Enter Valid Password.')
      return;
    }
    if(form.value.email != this.validUsername){
      alert('Please Enter Valid Username.')
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email,form.value.password);
    //console.log(form.value);
  }
}
