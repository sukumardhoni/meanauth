import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { tokenNotExpired } from 'angular2-jwt'

@Injectable()
export class AuthService {
  public APIHOST = 'http://localhost:3000/';
  authToken: any
  user: any

  constructor(private _http: Http) { }

  //register
  register(userObj) {
    let body = userObj
    let header = new Headers({ 'Content-Type': "application/json" });
    return this._http.post(this.APIHOST + 'users/register', body, { headers: header })
      .map(res => res.json())
  }

  //authenticate
  authenticate(userObj) {
    let body = userObj
    let header = new Headers({ 'Content-Type': "application/json" })
    return this._http.post(this.APIHOST + 'users/authenticate', body, { headers: header })
      .map(res => res.json())
  }

  //get Profile
  getProfile() {

    this.loadToken()
    let header = new Headers()
    header.append('Content-Type', "application/json")
    header.append('Authorization', this.authToken)
    console.log(this.authToken)
    return this._http.get(this.APIHOST + 'users/profile', { headers: header })
      .map(res => res.json())
  }

  //store user data locally
  storeUserData(token, user) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user
  }

  logOut() {
    localStorage.clear()
  }

  loadToken() {
    const token = localStorage.getItem('token')
    this.authToken = token;
  }

  loggedIn(){
    return !tokenNotExpired();
  }
}
