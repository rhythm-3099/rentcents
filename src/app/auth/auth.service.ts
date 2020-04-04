import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { UserData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class AuthService {

  public userId: string;
  public userEmail: string;
  public userName: string;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean;
  private tokenTimer: any;

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string, name : string, phnNUmber : string, address : string) {
    const userData : UserData = {email: email, password: password, name: name, number : phnNUmber, address : address};
    this.http.post("http://localhost:3000/api/user/signup", userData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/login']);
      });
  }

  login(email: string, password: string) {
    const authData : AuthData = {email: email, password: password};
    this.http.post<{token: string, userId: string, userName: string, userEmail: string, expiresIn: number}>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {

        const token = response.token;
        this.token = token;
        if(this.token){
          const userId = response.userId;
          const userName = response.userName;
          const userEmail = response.userEmail;
          this.userId = userId;
          this.userName = userName;
          this.userEmail = userEmail;

          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token,expirationDate,userId,userName,userEmail);
          this.router.navigate(['/']);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationData.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.userName = authInformation.userName;
      this.userEmail = authInformation.userEmail;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000); // => this is the time in milliseconds
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/login']);
    clearTimeout(this.tokenTimer);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userName: string,userEmail: string) {
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toISOString());
    localStorage.setItem('userId',userId);
    localStorage.setItem('userName',userName);
    localStorage.setItem('userEmail',userEmail);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if(!token || !expirationDate) {
      return;
    }
    return { token: token, expirationData: new Date(expirationDate), userId: userId, userName: userName, userEmail: userEmail }
  }

  getIsAuth(){
    return this.isAuthenticated;
  }


  paymentRequest(payment){
    let headers = new HttpHeaders();
    // console.log("register");
    headers.append('Content-Type','application/json');
    return  this.http.post('http://localhost:3000/api/payment/pay',payment , {headers:headers}).pipe(map((res: any) => res.json())).subscribe(result => {
      console.log(result);
    });;
  }

  paymentDetails(id){
    return this.http.get('http://localhost:3000/api/payment/paymentDetails/'+ id);
  }
  paymentSuccess(){
    return this.http.get('http://localhost:3000/api/payment/success');
  }

}
