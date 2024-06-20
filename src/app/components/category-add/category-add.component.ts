import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  categoryForm: FormGroup
  category:Category
  constructor(private categoryService: CategoryService, private router: Router) {
    this.category=new Category()
    this.categoryForm = new FormGroup({

      'name': new FormControl('',[Validators.required,Validators.minLength(6)]),
      'description':new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }

  ngOnInit() {
  }

     onSubmit(){
    if(this.categoryForm.invalid){
      alert('Vui lòng nhập lại')
      return console.log('Chưa đúng');
    } else {
      const nameControl = this.categoryForm.get('name');
      const descriptionControl = this.categoryForm.get('description');
      if (nameControl && descriptionControl) {
        this.category.name = nameControl.value;
        this.category.description = descriptionControl.value;
        this.categoryService.save(this.category).subscribe(data => {
          console.log(data);
          this.router.navigate(['/category-list']);
        });
    }
  }

  }
}
