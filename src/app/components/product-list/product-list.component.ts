import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  constructor(private productService: ProductService,private router: Router) { }
isExternalLink(image: string): boolean {
  return image.startsWith('http://') || image.startsWith('https://');
}

  ngOnInit() {
    return this.productService.getAll().subscribe(data => {
      this.products = data as Product[]
    })
  }
  deleteProduct(id: string) {
    var result = confirm("Chắc chắn xóa?")
    if (result) {
      this.productService.delete(id).subscribe(data => {
        console.log(data);
        this.router.navigate(['/product-list']).then(() => {
          window.location.reload();
        })

      })
    }
  }

}
