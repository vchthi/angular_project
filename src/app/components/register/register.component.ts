import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerF: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.registerF = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repassword: new FormControl('', Validators.required),
    }, { validators: this.passwordMatchValidator() });
  }

  ngOnInit() {
  }

  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('repassword')?.value;
      if (password !== confirmPassword) {
        return { mismatch: true };
      } else {
        return null;
      }
    }
  }

  onRegister(): void {
    if (this.registerF.invalid) {
      alert('Vui lòng nhập lại');
      return console.log('Không đúng');
    }

    this.userService.register(this.registerF.value).subscribe(
      (res: any) => {
        console.log(res);
        alert('Đăng kí thành công');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
