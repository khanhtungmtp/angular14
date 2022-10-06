import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleParam } from '../_core/_models/role/role';
import { NgxNotiflixService } from '../_core/_services/ngx-notiflix.service';
import { UserMasterService } from '../_core/_services/user-master.service';

@Component({
  selector: 'app-user-modal-popup',
  templateUrl: './user-modal-popup.component.html',
  styleUrls: ['./user-modal-popup.component.css']
})
export class UserModalPopupComponent implements OnInit {
  roleData: RoleParam[] = [];
  dataEdit: any;
  saveData: any;
  constructor(
    private userMaster: UserMasterService,
    private notiflix: NgxNotiflixService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private closePopup: MatDialogRef<UserModalPopupComponent>
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.getUser(this.data.userid);

  }

  getUser(id: string) {
    this.userMaster.getUser(id).subscribe({
      next: (res) => {
        this.dataEdit = res;
        if (this.dataEdit != null) {
          this.updateform.setValue({ userid: this.dataEdit.userid, role: this.dataEdit.role, isActive: this.dataEdit.isActive });
        }
      },
      error: () => {
        this.notiflix.error("Cannot get user");
      }
    })
  }

  saveUser() {
    this.notiflix.showLoading();
    if (this.updateform.valid) {
      this.userMaster.activateUser(this.updateform.getRawValue()).subscribe({
        next: (res) => {
          this.saveData = res
          if (this.saveData.result == 'pass') {
            this.notiflix.success("User updated");
            this.closePopup.close();
            this.notiflix.hideLoading();
          } else {
            this.notiflix.error("User create failed");
            this.notiflix.hideLoading();
          }
        },
        error: () => {
          this.notiflix.error("User create failed");
          this.notiflix.hideLoading();
        }
      })
    }

  }

  getRoles() {
    this.userMaster.getRoles().subscribe({
      next: (res) => {
        this.roleData = res;
      }, error: () => {
        this.notiflix.error("Cannot get Roles");
      }
    })
  }

  updateform = new FormGroup({
    userid: new FormControl({ value: '', disabled: true }),
    role: new FormControl("", Validators.required),
    isActive: new FormControl(true)
  })



}
