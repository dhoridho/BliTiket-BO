import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { ShiftPetugasService } from 'src/app/services/kepegawaian/shift-petugas/shift-petugas.service';
import { ActionShiftComponent } from './action/action.component';

@Component({
  selector: 'app-shift-tugas',
  templateUrl: './shift-tugas.component.html',
  styleUrls: ['./shift-tugas.component.scss']
})
export class ShiftTugasComponent implements OnInit {
  shiftTugas: any;
  page!: 1;
  offset!: 10;
  constructor(
    private ShiftTugasService: ShiftPetugasService,
    private dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData = () => {
    this.ShiftTugasService.getAllData(this.page, this.offset).subscribe(
      (resp) => {
        this.shiftTugas = resp.data;
      }
    );
  }

  action = (izinPetugasData= null) => {
    const dialogRef = this.dialog.open(ActionShiftComponent, {
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
    this.ShiftTugasService.Delete(id).subscribe(
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
