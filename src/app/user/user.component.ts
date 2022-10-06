import { UserModalPopupComponent } from './../user-modal-popup/user-modal-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { UserProfile } from './../_core/_models/user/userProfile';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxNotiflixService } from '../_core/_services/ngx-notiflix.service';
import { UserMasterService } from '../_core/_services/user-master.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  displayedColumns: string[] = ['userid', 'name', 'email', 'isactive', 'role', 'action'];
  userProfile: UserProfile[] = [];
  dataSource: any;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  constructor(
    private userMaster: UserMasterService,
    private notiflix: NgxNotiflixService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.notiflix.showLoading();
    this.userMaster.getUsers().subscribe({
      next: (res) => {
        this.userProfile = res;
        this.dataSource = new MatTableDataSource<UserProfile>(this.userProfile)
        this.dataSource.paginator = this.matPaginator;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Cannot get users');
        this.notiflix.hideLoading();
      }
    })
  }

  redictEditUser(id: string) {
    var popUp = this.dialog.open(UserModalPopupComponent, {
      width: '400px',
      height: '400px',
      exitAnimationDuration: '300ms',
      enterAnimationDuration: '300ms',
      data: {
        userid: id
      }
    });
    popUp.afterClosed().subscribe({
      next: (res) => {
        this.getUsers()
      }
    })
  }

  deleteUser(id: string) {
    this.notiflix.confirm('Confirm delete', 'Do you want remove this you', () => {
      // ok button
      this.notiflix.showLoading();
      this.userMaster.deleteUser(id).subscribe({
        next: (res) => {
          this.notiflix.success('User deleted successfully')
          this.notiflix.hideLoading();
          this.getUsers();
        },
        error: () => {
          this.notiflix.error('Unknown error')
          this.notiflix.hideLoading();
        }
      })
    }, () => {
      // cancel button
      this.notiflix.hideLoading();
    })
  }

}
