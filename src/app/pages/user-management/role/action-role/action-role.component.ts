import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { RoleModel } from 'src/app/@core/model/role.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { RoleService } from 'src/app/services/user-management/role.service';

@Component({
  selector: 'app-action-role',
  templateUrl: './action-role.component.html',
  styleUrls: ['./action-role.component.scss']
})
export class ActionRoleComponent implements OnInit {
  roleData = new RoleModel();

  constructor(
    public dialogRef: MatDialogRef<ActionRoleComponent>,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: RoleModel
  ) {
    if (data){
      this.roleData = data;
    }
  }

  ngOnInit(): void {
  }

  submitData = () => {
    let validation = false;
    let text = '';
    if (!this.roleData.role_name){
      validation = true;
      text = 'Nama role harus diisi';
    }
    if (validation){
      const rulesAlert: RulesSweetAlert = {
        title: 'Failed',
        text,
        icon: 'error',
        showCancelButton: false
    };
      sweetAlert(rulesAlert);
      return;
    }
    const param: any = {
      role_name: this.roleData.role_name
    };
    if (this.roleData.id){
      param.id = this.roleData.id;
      this.roleService.Update(param).subscribe(
        data => {
          if(data){
            this.dialogRef.close('Mengubah data');
          }
        }
      );
    }else{
      this.roleService.Save(param).subscribe(
        data => {
          if(data){
            this.dialogRef.close('Menambah data');
          }
        }
      );
    }
  }

}
