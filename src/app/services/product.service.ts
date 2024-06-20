import { Product } from 'src/app/models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ProductService {


  url = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(`${this.url}/products`)
  }
  getProductById(id: string) {
    return this.httpClient.get(`${this.url}/products/${id}`)
  }
  save(product: Product) {
    return this.httpClient.post(`${this.url}/products`, product)
  }
  updateById(id: string, product: Product) {
    return this.httpClient.put<any>(`${this.url}/products/${id}`, product)
  }
  delete(id: string) {
    return this.httpClient.delete(`${this.url}/products/${id}`)
  }
  getAllCategories() {
    return this.httpClient.get(`${this.url}/categories`)
  }
  getProductDetail(id: string) {
    return this.httpClient.get(`${this.url}/products/detail/${id}`)
  }
  getRelatedProductsByProductId(id: string){
    return this.httpClient.get(`${this.url}/products/related/${id}/related`)
  }

  getNew(){
    return this.httpClient.get(`${this.url}/products/new`)
  }
  // getByCategory(id: string){
  //   return this.httpClient.get(`${this.url}/products/tieuthuyet/${id}`)
  // }
  getProLienQuan(){
    return this.httpClient.get(`${this.url}/products/vanhoc`)
  }
  getVanHoc(){
    return this.httpClient.get(`${this.url}/products/vanhoc`)
  }
  getSaleProduct(){
    return this.httpClient.get(`${this.url}/products/sale`)
  }
  getHotProduct(){
    return this.httpClient.get(`${this.url}/products/hot`)
  }
  getGiaTangDan(){
    return this.httpClient.get(`${this.url}/products/giatangdan`)

  }
  getByCategory(categoryId:string){
    return this.httpClient.get(`${this.url}/products/category/${categoryId}`);
  }

  findByName(name:string){
    return this.httpClient.get(`${this.url}/products/search/${name}`);
}








  private cart: (Product & { quantity: number })[] = [];

  addCart(product: Product, quantity: number): void {
    const index = this.cart.findIndex((item: Product) => item._id === product._id);
    if (index === -1) {
      this.cart.push({ ...product, quantity });
    } else {
      this.cart[index].quantity += quantity;
    }
  }

  getCart(): (Product & { quantity: number })[] {
    return this.cart;
  }

  getCartLength(): number {
    return this.cart.reduce((length, product) => length + product.quantity, 0);
  }
  deleteCart(id:String):void{
    this.cart=this.cart.filter((item:Product)=>item._id!=id);
  }
  getSumMoney():number{
    let total=0;
    for(let p of this.cart){
      total+=p.price_2*p.quantity
    }
    return total
  }
}
