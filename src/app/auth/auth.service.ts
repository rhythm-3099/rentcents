import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: "root" })
export class AuthService {

  private userId: string;
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

  createUser(email: string, password: string) {
    const authData : AuthData = {email: email, password: password};
    this.http.post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/login']);
      });
  }

  login(email: string, password: string) {
    const authData : AuthData = {email: email, password: password};
    this.http.post<{token: string, userId: string, expiresIn: number}>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        console.log(response.expiresIn);
        const token = response.token;
        this.token = token;
        if(this.token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token,expirationDate);
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

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if(!token || !expirationDate) {
      return;
    }
    return { token: token, expirationData: new Date(expirationDate)}
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

}
