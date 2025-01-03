import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: any;
  isADM!: boolean;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isLogin = this.userService.checkLogin();
    this.isADM = this.userService.checkAdmin();
  }

  onLogout() {
    localStorage.clear();
    location.assign('/');
  }
}
