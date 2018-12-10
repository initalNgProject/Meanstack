import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 token: string;
 isAuthenticated: Boolean;
 private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    console.log('fdsfsd');
    this.http.post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log('dgdgf');
        console.log(response);
      });
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    console.log('fdsfsd');
    this.http.post<{token: string, expiresIn: string}>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        const expiresInDuration = response.expiresIn;
        console.log(expiresInDuration);
        console.log(response);
        const token = response.token;
        this.token = token;
        this.authStatusListener.next();
        if (token) {
           this.isAuthenticated = true;
          this.authStatusListener.next(true);
        //  const now = new Date();
         // const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
         // console.log(expirationDate);
         // this.saveAuthData(token, expirationDate);
          this.router.navigate(['/']);
        }

      });
  }
  getIsAuth() {
    return this.isAuthenticated;
  }


  logout() {
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
}
