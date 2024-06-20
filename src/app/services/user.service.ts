import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000'
  loggedIn = false;
  constructor(private httpClient: HttpClient) { }

  isAuthenticated() {
    const promise = new Promise<boolean>((resolve, reject) => {
      let jsonData = localStorage.getItem('login')
      if (jsonData) {
        this.loggedIn = true;
        resolve(this.loggedIn)
      } else {
        resolve(this.loggedIn)
      }
    })
    return promise;
  }

  isAdmin() {
    const promise = new Promise<boolean>((resolve, reject) => {
      let jsonData = localStorage.getItem('login')
      if (jsonData) {
        if(JSON.parse(jsonData).role==1){
          this.loggedIn = true;
          resolve(this.loggedIn)
        }

      } else {
        resolve(this.loggedIn)
      }
    })
    return promise;
  }



  checkLogin(): User | null {
    const jsonData = localStorage.getItem('login');
    if (jsonData) {
      return JSON.parse(jsonData) as User;
    }
    return null;
  }

  checkAdmin(): boolean {
    const user = this.checkLogin();
    return user ? user.role === 1 : false;
  }

  getAllUsers() {
    return this.httpClient.get(`${this.url}/users`)
  }
  login(body: any): any {
    return this.httpClient.post(`${this.url}/users/login`, body)
  }
  register(body: any): any {
    return this.httpClient.post(`${this.url}/users/register`, body)
  }

  getToken(){
    let jsonData =localStorage.getItem('login')
    if(jsonData){
      return JSON.parse(jsonData).access_token;
    }
    return false;
  }

  getRefreshToken(){
    let jsonData = localStorage.getItem('login')
    if(jsonData){
      return JSON.parse(jsonData).refresh_token;
    }
    return false
  }

  refreshToken(refreshToken:any):any{
    return this.httpClient.post<any>(`${this.url}/users/refresh-token`,refreshToken)
  }
}
