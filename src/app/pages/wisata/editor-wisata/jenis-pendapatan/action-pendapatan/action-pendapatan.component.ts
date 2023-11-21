import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { JenisPendapatanModel } from 'src/app/@core/model/jenis-pendapatan.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { JenisPendapatanService } from 'src/app/services/wisata/jenis-pendapatan.service';

@Component({
  selector: 'app-action-pendapatan',
  templateUrl: './action-pendapatan.component.html',
  styleUrls: ['./action-pendapatan.component.scss']
})
export class ActionPendapatanComponent implements OnInit {
  jenisPendapatan = new JenisPendapatanModel();
  constructor(
    private jenisPendapatanService: JenisPendapatanService,
    public dialogRef: MatDialogRef<ActionPendapatanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(data){
      this.jenisPendapatan = data;
    }
   }

  ngOnInit(): void {}

  submitData = () => {
    let validation = false;
    let text = '';
    if (!this.jenisPendapatan.jenis_pendapatan.name){
      validation = true;
      text = 'Persentase harus diisi';
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
      amount: this.jenisPendapatan.amount
    };
    if(this.jenisPendapatan.id){
      this.jenisPendapatanService.Update(this.jenisPendapatan.id, param).subscribe(
        (resp) => {
          if(resp){
            this.dialogRef.close('Mengubah data');
          }
        }
      );
    }
  }

}
