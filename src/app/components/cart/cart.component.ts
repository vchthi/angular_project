import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cart!: any[];
productService: ProductService =inject (ProductService)
  constructor() { }

  isExternalLink(image: string): boolean {
    return image.startsWith('http://') || image.startsWith('https://');
  }
  ngOnInit() {
    this.cart=this.productService.getCart();
    console.log(this.cart);

  }
  deleteCart(id:string){
    this.productService.deleteCart(id)
    this.cart=this.productService.getCart()
  }
  sumMoney():number{
    return this.productService.getSumMoney()
  }

}
