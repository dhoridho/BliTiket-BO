import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { PetugasService } from 'src/app/services/kepegawaian/petugas/petugas.service';
import { ActionComponent } from './action/action.component';

@Component({
  selector: 'app-petugas',
  templateUrl: './petugas.component.html',
  styleUrls: ['./petugas.component.scss']
})
export class PetugasComponent implements OnInit {
  petugas: any;
  totalData = 10;
  page = 1;
  offset = 10;

  constructor(
    private PetugasService: PetugasService,
    private dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData = (event: any = false) => {
    if (event) {
      this.page = event;
    }
    this.PetugasService.getAllData(this.page, this.offset).subscribe(
      (resp) => {
        this.petugas = resp.data;
        this.totalData = resp.length;
      }
    );
  }

  action = (pegawaiData= null) => {
    const dialogRef = this.dialog.open(ActionComponent, {
      width : '800px',
      maxHeight: '100vh',
      data : pegawaiData
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
    this.PetugasService.Delete(id).subscribe(
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

}
