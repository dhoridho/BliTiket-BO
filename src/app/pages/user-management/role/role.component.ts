import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { RoleService } from 'src/app/services/user-management/role.service';
import { ActionRoleComponent } from './action-role/action-role.component';
import { EditHakAksesComponent } from './edit-hak-akses/edit-hak-akses.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  roles: any;
  page = 1
  offset = 10
  totalData= 0

  constructor(
    private roleService: RoleService,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll = (event: any = false) => {
    if (event) {
      this.page = event;
    }
    this.roleService.getAllData(this.page, this.offset).subscribe(
      (resp) => {
        this.roles = resp.data;
        this.totalData = resp.length;
      }
    );
  }

  action = (roleData = null) => {
    const dialogRef = this.dialog.open(ActionRoleComponent, {
      width : '500px',
      maxHeight: '100vh',
      data : roleData
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
          this.getAll();
        }
      }
    );
  }

  deleteData = (id: number) => {
    this.roleService.Delete(id).subscribe(
      data => {
        if(data){
          const rulesAlert: RulesSweetAlert = {
            title: 'Dihapus',
            text: 'Data berhasil dihapus!',
            icon: 'success',
            showCancelButton: false
          };
  
          sweetAlert(rulesAlert);
          this.getAll();
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

  editHakAkses = (roleData: any) => {
    const dialogRef = this.dialog.open(EditHakAksesComponent, {
      width : '800px',
      maxHeight : '100vh',
      data : roleData
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result){
          this.getAll();
        }
      }
    );
  }

}
