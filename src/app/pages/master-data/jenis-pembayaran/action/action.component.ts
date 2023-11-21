import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { PaymentMethodModel } from 'src/app/@core/model/payment-method.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { PaymentMethodService } from 'src/app/services/master-data/payment-method/payment-method.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponentPaymentMethod implements OnInit {
  paymentMethod = new PaymentMethodModel();
  image: string;
  filename: string;
  imgUrl = environment.APIIMAGE;
  constructor(
    private paymentMethodService: PaymentMethodService,
    public dialogRef: MatDialogRef<ActionComponentPaymentMethod>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentMethodModel
  ) {
    if (data){
      this.paymentMethod = data;
    }
  }
  ngOnInit(): void {
  }

  submitData = () => {
    let validation = false;
    let text = '';
    if (!this.paymentMethod.bank_name){
      validation = true;
      text = 'Nama Bank Harus Diisi';
    }else if (!this.paymentMethod.bank_code){
      validation = true;
      text = 'Kode Bank Harus Diisi';
    }else if (!this.paymentMethod.cost_type){
      validation = true;
      text = 'Tipe Harus Diisi';
    }else if (!this.paymentMethod.cost_value){
      validation = true;
      text = 'Nilai Harus Diisi';
    }else if (!this.paymentMethod.bank_image){
      validation = true;
      text = 'Logo harus Diisi';
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

    if(this.paymentMethod.id){
      this.paymentMethodService.Update(this.paymentMethod, this.paymentMethod.id).subscribe(
        (resp) => {
          if(resp){
            this.dialogRef.close('Mengubah data');
          }
        }
      );
    }else{
      this.paymentMethodService.Save(this.paymentMethod).subscribe(
        (resp) => {
          if(resp){
            this.dialogRef.close('Menambah data');
          }
        }
      );
    }
  }
}
