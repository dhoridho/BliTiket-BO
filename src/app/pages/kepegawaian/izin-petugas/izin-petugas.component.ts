import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { IzinPetugasService } from 'src/app/services/kepegawaian/izin-petugas/izin-petugas.service';
import { ActionComponentIzin } from './action/action.component';

@Component({
  selector: 'app-izin-petugas',
  templateUrl: './izin-petugas.component.html',
  styleUrls: ['./izin-petugas.component.scss']
})
export class IzinPetugasComponent implements OnInit {

  izinPetugas: any;
  pegawaiData: any;
  pegawaiPenggantiData: any;
  page!: 1;
  offset!: 10;

  constructor(
    private IzinPetugasService: IzinPetugasService,
    private dialog: MatDialog,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData = () => {
    this.IzinPetugasService.getAllData(this.page, this.offset).subscribe(
      (resp) => {
        this.izinPetugas = resp.data;
      }
    );
  }

  action = (izinPetugasData= null) => {
    const dialogRef = this.dialog.open(ActionComponentIzin, {
      width : '800px',
      maxHeight: '100vh',
      data : izinPetugasData
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
    this.IzinPetugasService.Delete(id).subscribe(
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
      title: 'Apakah anda yakin ingin menghapus data ini??',
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

}
