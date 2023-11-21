import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { PaymentMethodModel } from 'src/app/@core/model/payment-method.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { PaymentMethodService } from 'src/app/services/master-data/payment-method/payment-method.service';
import { ActionComponentPaymentMethod } from './action/action.component';

@Component({
  selector: 'app-jenis-pembayaran',
  templateUrl: './jenis-pembayaran.component.html',
  styleUrls: ['./jenis-pembayaran.component.scss']
})
export class JenisPembayaranComponent implements OnInit {
  paymentMethod: PaymentMethodModel[] = [];
  totalData = 10;
  page = 1;
  offset = 10;
  constructor(
    private dialog: MatDialog,
    private paymentMethodService: PaymentMethodService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(event: any = false) {
    if (event) {
      this.page = event;
    }
    const param = {
      page: this.page,
      offset: this.offset
    };
    this.paymentMethodService.getAllData(param).subscribe(
      (resp) => {
        this.paymentMethod = resp.data;
        this.totalData = resp.length;
      }
    );
  }

  action(value: any = null) {
    const dialogRef = this.dialog.open(ActionComponentPaymentMethod, {
      width : '800px',
      maxHeight: '100vh',
      data : value
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
    this.paymentMethodService.Delete(id).subscribe(
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
