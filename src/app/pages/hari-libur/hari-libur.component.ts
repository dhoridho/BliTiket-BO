import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { HariLiburService } from 'src/app/services/hari-libur/hari-libur.service';
import { ActionComponent } from './action/action.component';

@Component({
  selector: 'app-hari-libur',
  templateUrl: './hari-libur.component.html',
  styleUrls: ['./hari-libur.component.scss']
})
export class HariLiburComponent implements OnInit {
  hariLiburs: any;
  hariLiburLength: number
  totalData= 0
  page = 1;
  offset = 10;
  constructor(
    private HariLiburService: HariLiburService,
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
    const param = {
      page: this.page,
      offset: this.offset
    };
    this.HariLiburService.getAllData(param).subscribe(
      (resp) => {
        this.hariLiburs = resp.data;
        this.totalData = resp.length;
        this.hariLiburLength = resp.data.length;
      }
    );
  }

  action = (hariData= null) => {
    const dialogRef = this.dialog.open(ActionComponent, {
      width : '800px',
      maxHeight: '100vh',
      data : hariData
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
    this.HariLiburService.Delete(id).subscribe(
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
