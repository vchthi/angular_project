import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  product!: Product;
  id: string;
  categories: Category[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router, private categoryService: CategoryService) {
    this.id = route.snapshot.params['id'];
    this.productForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'category': new FormControl('', Validators.required),
      'price_1': new FormControl('', Validators.required),
      'price_2': new FormControl('', Validators.required),
      'mota_1': new FormControl('', Validators.required),
      'mota_2': new FormControl('', Validators.required),
      'image': new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.productService.getProductById(this.id).subscribe(data => {
      this.product = data as Product;
      console.log('Thông tin sản phẩm lấy về:', this.product);
      this.productForm.patchValue({
        '_id': this.product._id,
        'name': this.product.name,
        'category': this.product.category?.categoryId,
        'price_1': this.product.price_1,
        'price_2': this.product.price_2,
        'mota_1': this.product.mota_1,
        'mota_2': this.product.mota_2,
        'image': this.product.image,
      });
    });

    this.productService.getAllCategories().subscribe(data => {
      this.categories = data as Category[];
      console.log('Danh sách danh mục:', this.categories);
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      alert('Vui lòng nhập lại');
      return console.log('Form không hợp lệ');
    } else {
      const updatedProduct = this.productForm.value;
      console.log('Dữ liệu gửi đi:', updatedProduct);
      this.productService.updateById(this.id, updatedProduct).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/product-list']);
        }
      });
    }
  }
}
