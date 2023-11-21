import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { TarifParkirService } from 'src/app/services/wisata/tarif-parkir/tarif-parkir.service';
import { ActionComponentTarifParkir } from './action/action.component';

@Component({
  selector: 'app-tarif-parkir',
  templateUrl: './tarif-parkir.component.html',
  styleUrls: ['./tarif-parkir.component.scss']
})
export class TarifParkirComponent implements OnInit {
  @Input() tarifParkir: any[];
  @Input() tarifParkirLength: number;
  @Input() refreshData: any;
  @Input() idTempatWisata: number;
  page: 1;
  offset: 10;
  constructor(
    private tarifParkirService: TarifParkirService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  action =  (idTempatWisata: any, value: any) => {
    const dialogRef = this.dialog.open(ActionComponentTarifParkir, {
      width : '800px',
      maxHeight: '100vh',
      data : {idTempatWisata, value}
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
          this.refreshData();
        }
      }
    );
  }

  deleteData = (id: number) => {
    this.tarifParkirService.Delete(id).subscribe(
      (data) => {
        if (data) {
          const rulesAlert: RulesSweetAlert = {
            title: 'Dihapus',
            text: 'Data berhasil dihapus!',
            icon: 'success',
            showCancelButton: false
          };
  
          sweetAlert(rulesAlert);
          this.refreshData();
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
