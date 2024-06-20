import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  products!:Product;
  RelatedProducts: Product[] = [];

  id:string;

  constructor(private route: ActivatedRoute,private productService: ProductService) {
    this.id = route.snapshot.params['id'];
  }
  isExternalLink(image: string): boolean {
    return image.startsWith('http://') || image.startsWith('https://');
  }
  ngOnInit() {
    this.productService.getProductById(this.id).subscribe(data => {
      this.products = data as Product;
  })
  this.productService.getRelatedProductsByProductId(this.id).subscribe(data => {
    this.RelatedProducts = data as Product[];
    console.log('lienquan:', this.RelatedProducts);
  });

  }
  addCart(quantity: string): void {
    if (this.products) {
      const qty = parseInt(quantity, 10);
      if (!isNaN(qty) && qty > 0) {
        this.productService.addCart(this.products, qty);
        console.log(this.productService.getCart());
      } else {
        console.error('Invalid quantity');
      }
    } else {
      console.error('Product not loaded');
    }
  }
}
