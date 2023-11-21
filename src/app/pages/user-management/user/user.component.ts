import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { UserService } from 'src/app/services/user-management/user.service';
import { ActionUserComponent } from './action-user/action-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: any;
  page = 1;
  offset = 10;
  totalData = 10;
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData = (event: any = null) => {
    if (event) {
      this.page = event;
    }
    this.userService.getAllData(this.page, this.offset).subscribe(
      (resp) => {
        this.users = resp.data;
        this.totalData = resp.length;
      }
    );
  }

  action = (service = null) => {
    const dialogRef = this.dialog.open(ActionUserComponent, {
      width : '800px',
      maxHeight: '100vh',
      data : service
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result){
          const rulesAlert: RulesSweetAlert = {
            title: 'Berhasil',
            text: result,
            icon: 'success',
            showCancelButton: false
          };
          sweetAlert(rulesAlert);
          this.getAllData();
        }
      }
    );
  }

  deleteData = (id: number) => {
    this.userService.Delete(id).subscribe(
      data => {
        if(data){
          const rulesAlert: RulesSweetAlert = {
            title: 'Dihapus',
            text: 'Data berhasil dihapus!',
            icon: 'success',
            showCancelButton: false
          };
          sweetAlert(rulesAlert);
          this.getAllData();
        }
      }, () => {
        const rulesAlert: RulesSweetAlert = {
          title: 'Error!',
          text: 'Gagal menghapus data Data',
          icon: 'error',
          showCancelButton: false
        };
        sweetAlert(rulesAlert);
      }
    );
  }

  confirmBox = (id: number) => {
    const rulesData: RulesSweetAlert = {
      title: 'Apakah anda yakin ingin menghapus data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00000',
      cancelButtonColor: '#00000',
      confirmButtonText: 'Delete',
      action: (result: any) => {
        if (result.isConfirmed) {
          this.deleteData(id);
        }
      }
    };
    sweetAlert(rulesData);
  }

  confirmBoxResetPassword = (id: number) => {
    const rulesData: RulesSweetAlert = {
      title: 'Apakah anda yakin ingin reset kata sandi?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00000',
      cancelButtonColor: '#00000',
      confirmButtonText: 'Yes',
      action: (result: any) => {
        if (result.isConfirmed) {
          this.resetPassword(id);
        }
      }
    };
    sweetAlert(rulesData);
  }

  resetPassword = (id: number) => {
    this.userService.resetPassword(id).subscribe(
      data => {
        const rulesAlert: RulesSweetAlert = {
          title: 'Your new password is',
          text: data.new_password,
          icon: 'success',
          showCancelButton: false
        };
        sweetAlert(rulesAlert);
      }
    );
  }
}
