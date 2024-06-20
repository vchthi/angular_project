import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      alert('Vui lòng nhập lại');
      return console.log('Chưa đúng');
    }

    this.userService.login(this.loginForm.value).subscribe(
      (res: any) => {
        console.log(res);
        alert('Đăng nhập thành công');
        let jsonData = JSON.stringify(res);
        localStorage.setItem('login', jsonData);
        location.assign('/');
      },
      (error: any) => {
        console.error(error);
        console.log('Tên đăng nhập hoặc mật khẩu chưa đúng');
        alert('Tên đăng nhập hoặc mật khẩu chưa đúng');
      }
    );
  }
}
