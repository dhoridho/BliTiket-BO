import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { LokasiService } from 'src/app/services/lokasi/lokasi.service';
import { ActionComponent } from './action/action.component';

@Component({
  selector: 'app-lokasi',
  templateUrl: './lokasi.component.html',
  styleUrls: ['./lokasi.component.scss']
})
export class LokasiComponent implements OnInit {
  lokasis: any;
  totalData= 0
  page = 1;
  offset = 10;
  lokasiLength: number;

  constructor(
    private LokasiService: LokasiService,
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
    this.LokasiService.getAllData(this.page, this.offset).subscribe(
      (resp) =>{
        this.lokasis = resp.data;
        this.totalData = resp.length;
        this.lokasiLength = resp.data.length;
      }
    );
  }

  action = (lokasiData= null) => {
    const dialogRef = this.dialog.open(ActionComponent, {
      width : '500px',
      maxHeight: '100vh',
      data : lokasiData
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
    this.LokasiService.Delete(id).subscribe(
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

  confirmDelete = (id: number) => {
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
