import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { resolve } from 'dns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  isLoading = false;
  validPassword="Aa123456";
  validUsername="abc@gmail.com";
  invalid: Number;

  constructor(public authService: AuthService,  private router: Router){}

  async onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    // if(form.value.password != this.validPassword){
    //   alert('Please Enter Valid Password.')
    //   return;
    // }
    // if(form.value.email != this.validUsername){
    //   alert('Please Enter Valid Username.')
    //   return;
    // }
    this.isLoading = true;
    this.authService.login(form.value.email,form.value.password).subscribe(data => {
      if(data.message == "successfully logged in"){
        //console.log('itthe ', data.message);
        const userId = data.userId;
        const userName = data.userName;
        const email = data.userEmail;
        const expiresInDuration = data.expiresIn;

        this.authService.setAuthTimer(expiresInDuration);
        this.authService.authStatusListener.next(true);
        this.authService.isAuthenticated = true;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.authService.saveAuthData(data.token,expirationDate,userId,userName,email);
        //console.log("hey beautiful");
        if(this.authService.isAuthenticated){
          this.router.navigate(['/homepage']);
        }
      } else {
        if(data.message == "Mail wrong"){
          alert('The email that you entered is not recognised');
          this.isLoading = false;
        } else if(data.message == "Password wrong"){
          alert('The password that you entered is incorrect');
          this.isLoading = false;
        } else if(data.message == "Not verified") {
          alert('This email ID is not verified. Check your email to verify this account!');
          this.isLoading = false;
        } else {
          this.router.navigate(['/login']);
        }
      }


    }), error => {
      alert("Some error!");
    }

    //console.log(form.value);
  }
}
