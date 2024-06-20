import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Category } from '../models/category';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
url = 'http://localhost:3000'

constructor(private httpClient: HttpClient,private userService:UserService) { }

getAll() {
  const headers = {
    'Authorization': 'Bearer ' + this.userService.getToken()
  };
  console.log(headers);

  return this.httpClient.get(`${this.url}/categories`, { headers: headers });
}

get(id:string){
  return this.httpClient.get(`${this.url}/categories/${id}`)
}
save(category:Category){
  return this.httpClient.post(`${this.url}/categories`,category)
}
update(id: string,category:Category){
  return this.httpClient.put<any>(`${this.url}/categories/${id}`,category)
}
delete(id:string){
  return this.httpClient.delete(`${this.url}/categories/${id}`)
}
}
