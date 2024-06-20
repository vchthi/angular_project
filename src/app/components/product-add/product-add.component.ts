// import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from '../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {
    this.product = new Product();
    this.productForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'category': new FormControl(null, Validators.required),
      'price_1': new FormControl(null, Validators.required),
      'price_2': new FormControl(null, Validators.required),
      'mota_1': new FormControl(null, Validators.required),
      'mota_2': new FormControl(null, Validators.required),
      'image': new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      alert('Vui lòng nhập lại');
      return console.log('Chưa đúng');
    } else {
      this.product.name = this.productForm.value.name;
      this.product.category = this.productForm.value.category;
      this.product.price_1 = this.productForm.value.price_1;
      this.product.price_2 = this.productForm.value.price_2;
      this.product.mota_1 = this.productForm.value.mota_1;
      this.product.mota_2 = this.productForm.value.mota_2;
      this.product.image = this.productForm.value.image;

      this.productService.save(this.product).subscribe(data => {
        console.log(data);
        this.router.navigate(['/product-list']);
      });
    }
  }
}
