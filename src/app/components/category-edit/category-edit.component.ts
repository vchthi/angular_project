import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup
  category!:Category
  id:string;
  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router) {
    this.id=route.snapshot.params['id'];
    console.log(`id là ${this.id}`);

  this.categoryForm=new FormGroup({
    '_id': new FormControl(''),
    'name':new FormControl('',[Validators.required,Validators.minLength(6)]),
    'description':new FormControl('',[Validators.required,Validators.minLength(6)])
  })
}
  ngOnInit() {this.categoryService.get(this.id).subscribe(data=>{
  this.category= data as Category;
  this.categoryForm.patchValue({
    '_id': this.category._id,
    'name': this.category.name,
    'description': this.category.description
  });
  })
  }

  onSubmit(){
    if(this.categoryForm.invalid){
      alert('Vui lòng nhập lại');
      return console.log('Chưa đúng');
    } else {
     //gan gia tri
      const categoryIdControl = this.categoryForm.get('_id');
      const categoryNameControl = this.categoryForm.get('name');
      const categoryDescriptionControl = this.categoryForm.get('description');
      if (categoryIdControl && categoryNameControl && categoryDescriptionControl) {
        this.category._id = categoryIdControl.value;
        this.category.name = categoryNameControl.value;
        this.category.description = categoryDescriptionControl.value;

        // Gửi dữ liệu từ categoryForm lên để cập nhật
        this.categoryService.update(this.id, this.categoryForm.value).subscribe(data=>{
          console.log(data);
          this.router.navigate(['/category-list']);
        });
      } else {
        console.log('Form không hợp lệ');
      }
    }
  }
  }
