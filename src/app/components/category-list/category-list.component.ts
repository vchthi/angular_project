import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router'; //
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/models/category';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories!: Category[];
  constructor(private categoryService: CategoryService, private userService: UserService,  private router: Router) { }

  ngOnInit() {

    return this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
    },(error:any)=>{
      console.log(error);
      if(error&&error.status===401){
//access token het han, lay lai new access token tu refresh token
        try{
          const refreshToken= this.userService.getRefreshToken();
          console.log(refreshToken);
          if(!refreshToken){
            this.router.navigate(['login'])
            return;
          }

          //goi api refresh de lay new access token
          this.userService.refreshToken({'refresh_token':refreshToken}).subscribe((res:any)=>{
            console.log(res);

//cap nhat the access token va refeshtoken
            let jsonData=JSON.stringify(res);
            localStorage.setItem('login',jsonData);


            this.categoryService.getAll().subscribe(data => {
              this.categories = data as Category[];
            })
          })


        }catch(refreshError){
          console.error('Lỗi refresh token:', refreshError);
          //loi thi chuyen ve trang login
          this.router.navigate(['/login'])

        }
      }else{
        console.error('Error fetching data', error);
        throw error;
      }
    }

  )
  }


  deleteCategory(id: string) {
    var result = confirm("Chắc chắn xóa?")
    if (result) {
      this.categoryService.delete(id).subscribe(data => {
        console.log(data);
        this.router.navigate(['/category-list']).then(() => {
          window.location.reload();
        })

      })
    }
  }
}
