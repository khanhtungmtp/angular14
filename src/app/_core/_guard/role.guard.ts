import { UserMasterService } from './../_services/user-master.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxNotiflixService } from '../_services/ngx-notiflix.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private userMaster: UserMasterService,
    private notiflix: NgxNotiflixService,
    private router: Router
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userMaster.getRole() == 'admin') {
      return true;
    } else {
      this.notiflix.error("Cannot access")
      this.router.navigate(['/home'])
      return false;
    }
  }

}
