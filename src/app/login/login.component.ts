import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../_core/_services/user.service';
import { userParam } from '../_core/_models/login/userLogin';
import { NgxNotiflixService } from '../_core/_services/ngx-notiflix.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private notiflix: NgxNotiflixService,
    private router: Router,
  ) { }
  userLogin: any;
  ngOnInit(): void {
    localStorage.clear();
  }
  processLogin(userParams: userParam) {
    if (userParams) {
      this.notiflix.showLoading();
      this.userService.processLogin(userParams).subscribe({
        next: (res) => {
          this.userLogin = res;
          if (this.userLogin) {
            localStorage.setItem('token', this.userLogin.jwtToken)
            this.notiflix.success('Login successfully')
            this.router.navigate(['/home']);
            this.notiflix.hideLoading();
          } else {
            this.notiflix.error('Login failed')
            this.notiflix.hideLoading();
          }
        },
        error: () => {
          this.notiflix.error('Login failed')
          this.notiflix.hideLoading();
        }
      })
    }
  }

  redirectRegister() {
    this.router.navigate(['/access/register']);
  }

}
