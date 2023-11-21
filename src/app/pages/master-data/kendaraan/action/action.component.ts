import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { KendaraanModel } from 'src/app/@core/model/kendaraan.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { KendaraanService } from 'src/app/services/master-data/kendaraan/kendaraan.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  kendaraanData= new KendaraanModel()

  constructor(
    public dialogRef: MatDialogRef<ActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: KendaraanModel,
    private kendaraanService: KendaraanService
  ) {
    if(data){
      this.kendaraanData = data;
    }
   }

  ngOnInit(): void {
  }

  submitData = () => {
    let validation = false;
    let text = '';

    if(!this.kendaraanData.nama_jenis_kendaraan){
      validation = true;
      text = 'Nama jenis kendaraan harus diisi';
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
    const param: any = {
      id: this.kendaraanData.id,
      nama_jenis_kendaraan: this.kendaraanData.nama_jenis_kendaraan
    };
    if(this.kendaraanData.id){
      this.kendaraanService.Update(param).subscribe(
        (resp) => {
          if(resp){
            this.dialogRef.close('Mengubah Data');
          }
        }
      );
    }else{
      this.kendaraanService.save(param).subscribe(
        (resp) => {
          if(resp){
            this.dialogRef.close('Menambah Data');
          }
        }
      );
    }
  }

}
