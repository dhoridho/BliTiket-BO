import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { KendaraanService } from 'src/app/services/master-data/kendaraan/kendaraan.service';
import { ActionComponent } from './action/action.component';

@Component({
  selector: 'app-kendaraan',
  templateUrl: './kendaraan.component.html',
  styleUrls: ['./kendaraan.component.scss']
})
export class KendaraanComponent implements OnInit {
  kendaraan: any;
  totalData = 0;
  page = 1;
  offset = 10;
  constructor(
    private dialog: MatDialog,
    private kendaraanService: KendaraanService

  ) { }

  ngOnInit(): void {
    this.getAllData();
  }
  
  getAllData = (event: any = false) => {
    if (event) {
      this.page = event;
    }
    const param = {
      page: this.page,
      offset: this.offset
    };
    this.kendaraanService.getAllData(param).subscribe(
      (resp) => {
        this.kendaraan = resp.data;
        this.totalData = resp.length;
      }
    );
  }

  action = (kendaraanData = null) => {
    const dialogRef = this.dialog.open(ActionComponent, {
      width : '500px',
      maxHeight: '100vh',
      data : kendaraanData
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
    this.kendaraanService.Delete(id).subscribe(
      data => {
        if(data){
          const rulesAlert: RulesSweetAlert = {
            title: 'Terhapus!',
            text: 'Data berhasil dihapus',
            icon: 'success',
            showCancelButton: false
          };
  
          sweetAlert(rulesAlert);
          this.getAllData();
        }
      }, () => {
        const rulesAlert: RulesSweetAlert = {
          title: 'Error!',
          text: 'Gagal menghapus data',
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
