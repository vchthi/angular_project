import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products!: Product[];
  categories!: Category[];
  name!:string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
    });
  }

  getAllProducts() {
    this.productService.getAll().subscribe(data => {
      this.products = data as Product[];
    });
  }

  getByCategory(categoryId: string) {
    this.productService.getByCategory(categoryId).subscribe(data => {
      this.products = data as Product[];
    });
  }
  findByName(name:string){
    this.productService.findByName(name).subscribe(data => {
      this.products = data as Product[];
  })
}

  isExternalLink(image: string): boolean {
    return image.startsWith('http://') || image.startsWith('https://');
  }
}
