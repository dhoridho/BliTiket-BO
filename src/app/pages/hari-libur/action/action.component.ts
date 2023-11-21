import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { HariModel } from 'src/app/@core/model/hari-libur.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { HariLiburService } from 'src/app/services/hari-libur/hari-libur.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  HariData = new HariModel();
  tanggal = new Date();
  constructor(
    public dialogRef: MatDialogRef<ActionComponent>,
    private HariLiburService: HariLiburService,
    @Inject(MAT_DIALOG_DATA) public data: HariModel
  ) {
    if(data){
      this.HariData = data;
    }
   }

  ngOnInit(): void {
  }

  submitData = () => {
    let validation = false;
    let text = '';
    if (!this.HariData.tanggal){
      validation = true;
      text = 'Tanggal harus dipilih';
    }else if (!this.HariData.nama_hari_libur){
      validation = true;
      text = 'Hari libur harus diisi';
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
      id: this.HariData.id,
      tanggal: this.HariData.tanggal,
      nama_hari_libur: this.HariData.nama_hari_libur
    };
    if (this.HariData.id){
      this.HariLiburService.Update(param).subscribe(
        data => {
          if(data){
            this.dialogRef.close('Mengubah data');
          }
        }
      );
    }else{
      this.HariLiburService.save(param).subscribe(
        data => {
          if(data){
            this.dialogRef.close('Menambah data');
          }
        }
      );
    }
  }

}
