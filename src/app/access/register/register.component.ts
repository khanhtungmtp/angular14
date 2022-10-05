import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_core/_services/user.service';
import { NgxNotiflixService } from 'src/app/_core/_services/ngx-notiflix.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userProfile: any;
  constructor(
    private userService: UserService,
    private notiflix: NgxNotiflixService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  redirectLogin() {
    this.router.navigate(['/login'])
  }

  saveUser() {
    if (this.reactiveform.valid) {
      this.notiflix.showLoading();
      this.userService.register(this.reactiveform.value).subscribe({
        next: (res) => {
          this.userProfile = res;
          if (this.userProfile.result == 'pass') {
            this.notiflix.success('User Created');
            this.redirectLogin();
            this.notiflix.hideLoading();
          } else {
            this.notiflix.error('Create user failed');
            this.notiflix.hideLoading();
          }
        }, error: () => {
          this.notiflix.error('Create user failed');
          this.notiflix.hideLoading();
        }
      })
    }
  }

  reactiveform = new FormGroup({
    userid: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email]))
  })

}
