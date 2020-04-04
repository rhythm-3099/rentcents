import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { UserData } from './auth-data.model';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserProfileComponent } from 'app/userProfile/userprofile.component';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { User } from '../services/user.model';

@Injectable({ providedIn: "root" })
export class AuthService {

  public userId: string;
  public userName: string;
  public userEmail: string;
  private token: string;
  public authStatusListener = new Subject<boolean>();
  public isAuthenticated: boolean;
  private tokenTimer: any;

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {}

  // createUser(email: string, password: string, name : string, phnNUmber : string, address : string) {
  //   const userData : UserData = {email: email, password: password, userName: name, number : phnNUmber, address : address};
  //   this.http.post("http://localhost:3000/api/user/signup", userData)
  //     .subscribe(response => {
  //       console.log(response);
  //       this.router.navigate(['/login']);
  //     });
  // }

  createUser(email: string, password: string, name : string, phnNUmber : string, address : string): Observable<{message: string, result: any}> {
    const userData : UserData = {email: email, password: password, userName: name, number : phnNUmber, address : address};
    return this.http.post<{message: string, result: any}>("http://localhost:3000/api/user/signup", userData)
      .catch(this.signupErrorHandler);
  }

  signupErrorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "server error :(");
  }

  async checkIfUserExists(email: string){
    let notExists = true;
    console.log('rhythm here');

    this.http.get("http://localhost:3000/api/user/checkuser/"+email)
      .subscribe(response => {
        console.log(response);
        //this.router.navigate(['/signup']);
      })
  }

  // login(email: string, password: string): Number {
  //   //this.checkIfUserExists(email);
  //   let rhythm=0;
  //   const authData : AuthData = {email: email, password: password};
  //   this.http.post<{token: string, userId: string, userName: string, expiresIn: number, message: string, userEmail: string}>("http://localhost:3000/api/user/login", authData)
  //     .toPromise().then(response => {
  //       // if(response == 'login error') {

  //       // }
  //       console.log('why no response',response.message);
  //       if(response.message == 'Mail wrong'){
  //         rhythm = 0;
  //       } else if(response.message == 'Password wrong'){
  //         rhythm = 1;
  //       }
  //       const token = response.token;
  //       this.token = token;
  //       if(this.token){
  //         const userId = response.userId;
  //         const userName = response.userName;
  //         const email = response.userEmail;
  //         this.userId = userId;
  //         this.userName = userName;

  //         const expiresInDuration = response.expiresIn;
  //         this.setAuthTimer(expiresInDuration);
  //         this.authStatusListener.next(true);
  //         this.isAuthenticated = true;
  //         const now = new Date();
  //         const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
  //         this.saveAuthData(token,expirationDate,userId,userName,email);
  //         this.router.navigate(['/']);
  //         rhythm = 8;
  //       }
  //       console.log('In the login dep');
  //     });
  //     return rhythm;
  // }

  login(email:string, password: string): Observable<{token: string, userId: string, userName: string, userEmail: string, expiresIn: number, message: string}> {
    const authData : AuthData = {email: email, password: password};
    return this.http.post<{token: string, userId: string, userName: string, userEmail: string, expiresIn: number, message: string}>("http://localhost:3000/api/user/login",authData)
      .catch(this.loginErrorHandler);
  }

  loginErrorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error");
  }

  updateUserInfo(email: string, password: string, name : string, phnNUmber : string, address : string) : Observable<User>{
    const userData: UserData = {email:email, password: password, userName: name, number: phnNUmber, address: address};
    const userId = localStorage.getItem('userId');
    return this.http.put<User>("http://localhost:3000/api/user/updateuser/" + userId,userData)
      .catch(this.updateUserErrorHandler);
  }

  updateUserErrorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "server error");
  }

  autoAuthUser() {
    //console.log('get till here');

    const authInformation = this.getAuthData();


    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationData.getTime() - now.getTime();
    console.log('expires ', expiresIn);
    if(expiresIn > 0){
      console.log('herer?');
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.userName = authInformation.userName;
      console.log('naam ', this.userName);
      this.userEmail = authInformation.userEmail;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  setAuthTimer(duration: number){
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

  saveAuthData(token: string, expirationDate: Date, userId: string, userName: string, userEmail: string) {
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

}
