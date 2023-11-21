import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { LokasiModel } from 'src/app/@core/model/lokasi.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { LokasiService } from 'src/app/services/lokasi/lokasi.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  lokasiData = new LokasiModel();
  constructor(
    public dialogRef: MatDialogRef<ActionComponent>,
    private lokasiService: LokasiService,
    @Inject(MAT_DIALOG_DATA) public data: LokasiModel
  ) {
    if (data){
      this.lokasiData = data;
    }
  }

  ngOnInit(): void {}


  submitData = () => {
    let validation = false;
    let text = '';
    if (!this.lokasiData.nama_lokasi){
      validation = true;
      text = 'Alamat harus dipilih';
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
      nama_lokasi: this.lokasiData.nama_lokasi
    };
    if (this.lokasiData.id){
      param.id = this.lokasiData.id;
      this.lokasiService.Update(param).subscribe(
        data => {
          if(data){
            this.dialogRef.close('Mengubah data');
          }
        }
      );
    }else{
      this.lokasiService.save(param).subscribe(
        data => {
          if(data){
            this.dialogRef.close('Menambah data');
          }
        }
      );
    }
  }

}
