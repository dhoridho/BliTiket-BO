import { Component,  Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthModel } from 'src/app/@core/model/auth.model';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { checkEmailFormat, sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { PetugasService } from 'src/app/services/kepegawaian/petugas/petugas.service';
import { LokasiService } from 'src/app/services/lokasi/lokasi.service';
import { RoleService } from 'src/app/services/user-management/role.service';
import { UserService } from 'src/app/services/user-management/user.service';

@Component({
  selector: 'app-action-user',
  templateUrl: './action-user.component.html',
  styleUrls: ['./action-user.component.scss']
})
export class ActionUserComponent implements OnInit {
  page = 1;
  offset = 10;
  userData = new AuthModel();
  roles: any[];
  petugas: any[] = [];
  lokasi: any[] = [];
  realPetugas: any[] = [];
  constructor(    public dialogRef: MatDialogRef<ActionUserComponent>,
    private userService: UserService,
    private roleService: RoleService,
    private petugasService: PetugasService,
    private lokasiService: LokasiService,
    @Inject(MAT_DIALOG_DATA) public data: AuthModel
  ) {
    if (data){
      setTimeout(() => {
        this.userData = data;
      }, 500)
    }
   }

  ngOnInit(): void {
    this.getAllRole();
    this.getAllPetugas();
    this.getAllLokasi();
  }

  getAllRole = () => {
    this.roleService.getAllData(this.page, this.offset).subscribe(
      (resp) => {
        this.roles = resp.data;
      }
    );
  }

  getAllPetugas = () => {
    this.petugasService.getAllData().subscribe(
      (resp) => {
        let data = resp.data
        this.realPetugas = data
        data.forEach((element: any) => {
          const newData: any = {
              options: [
                  { value: element.id, label: element.nama }
              ]
          };
          this.petugas.push(newData);
        });
      }
    );
  }

  getAllLokasi = () => {
    this.lokasiService.getAllData().subscribe(
      (resp) => {
        let data = resp.data
        data.forEach((element: any) => {
          const newData: any = {
              options: [
                  { value: element.id, label: element.nama_lokasi }
              ]
          };
          this.lokasi.push(newData);
        });
      }
    );
  }

  update(event: any) {
    this.userData.id_pegawai = event.value;
  }
  
  updateLokasi(event: any) {
    this.userData.id_lokasi = event.value;
  }

  submitData = () => {
    let validation = false;
    let text = '';

    if (!this.userData.email) {
      validation = true;
      text = 'Email harus diisi';
    }else if (checkEmailFormat(this.userData.email) === null){
      validation = true;
      text = 'Email tidak sesuai format';
    }else if (!this.userData.id_pegawai){
      validation = true;
      text = 'Petugas harus dipilih';
    }else if (!this.userData.role_id) {
      validation = true;
      text = 'Role harus dipilih';
    }else if (!this.userData.tipe_user){
      validation = true;
      text = 'Tipe user harus dipilih';
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
    const param = {
      id: this.userData.id,
      role_id: this.userData.role_id,
      id_pegawai: this.userData.id_pegawai,
      email : this.userData.email,
      tipe_user : this.userData.tipe_user,
      id_lokasi: this.userData.id_lokasi ? +this.userData.id_lokasi : 0,
      id_tempat_wisata: this.realPetugas.find(val => val.id === +this.userData.id_pegawai).id_tempat_wisata
    };
    if (this.userData.id){
      this.userService.Update(param).subscribe(
        data => {
          const rulesAlert: RulesSweetAlert = {
            title: 'Succes',
            text: data.message,
            icon: 'success',
            showCancelButton: false
          };
          sweetAlert(rulesAlert);
          this.dialogRef.close('Mengubah data');
        }
      );
    }else{
      this.userService.save(param).subscribe(
        data => {
          const rulesAlert: RulesSweetAlert = {
            title: 'Succes',
            text: data.message,
            icon: 'success',
            showCancelButton: false
          };
          sweetAlert(rulesAlert);
          this.dialogRef.close('Menambah data');
        }
      );
    }
  }

}
