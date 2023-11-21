import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { ShiftTugas } from 'src/app/@core/model/shift-tugas.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { PetugasService } from 'src/app/services/kepegawaian/petugas/petugas.service';
import { ShiftPetugasService } from 'src/app/services/kepegawaian/shift-petugas/shift-petugas.service';
import { LokasiService } from 'src/app/services/lokasi/lokasi.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionShiftComponent implements OnInit {
  shiftTugas = new ShiftTugas();
  tanggal = new Date();
  petugas: any;
  lokasis: any;
  page: 1;
  offset: 10;

  constructor(
    public dialogRef: MatDialogRef<ActionShiftComponent>,
    private ShiftTugasService: ShiftPetugasService,
    private PetugasService: PetugasService,
    @Inject(MAT_DIALOG_DATA) public data: ShiftTugas
  ) {
    if (data){
      this.shiftTugas = data;
    }
  }

  ngOnInit(): void {
    this.getAllDataPetugas();
  }

  getAllDataPetugas = () => {
    this.PetugasService.getAllData(999999).subscribe(
      (resp) => {
        this.petugas = resp.data;
      }
    );
  }

  submitData = () => {
    let validation = false;
    let text = '';
    if (!this.shiftTugas.id_pegawai){
      validation = true;
      text = 'Petugas harus dipilih';
    }else if (!this.shiftTugas.tanggal){
      validation = true;
      text = 'Tanggal harus diisi';
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
      id: this.shiftTugas.id,
      id_pegawai: this.shiftTugas.id_pegawai,
      tanggal: this.shiftTugas.tanggal,
    };
    if (this.shiftTugas.id){
      this.ShiftTugasService.Update(param).subscribe(
        data => {
          if(data){
            this.dialogRef.close('Mengubah data');
          }
        }
      );
    }else{
      this.ShiftTugasService.save(param).subscribe(
        data => {
          if(data){
            this.dialogRef.close('Menambah data');
          }
        }
      );
    }
  }
}
