import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products!: Product[];
  hotProducts!: Product[];
  newProducts!: Product[];
  saleProducts!: Product[];
  vanHocProducts!: Product[];
  constructor(private productService: ProductService) { }
  isExternalLink(image: string): boolean {
    return image.startsWith('http://') || image.startsWith('https://');
  }
  ngOnInit() {

    this.productService.getAll().subscribe(data => {
      this.products = data as Product[]
    })
    // this.productService.getGiaTangDan().subscribe(data => {
    //   this.products = data as Product[]
    // })
    this.productService.getHotProduct().subscribe(data => {
      this.hotProducts = data as Product[]
    })
    this.productService.getNew().subscribe(data => {
      this.newProducts = data as Product[]
    })
    this.productService.getSaleProduct().subscribe(data => {
      this.saleProducts = data as Product[]
    })
    this.productService.getVanHoc().subscribe(data => {
      this.vanHocProducts = data as Product[]
    })

  }

}
