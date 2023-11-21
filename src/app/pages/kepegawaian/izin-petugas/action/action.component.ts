import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { IzinTugasModel } from 'src/app/@core/model/izin-tugas.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { IzinPetugasService } from 'src/app/services/kepegawaian/izin-petugas/izin-petugas.service';
import { PetugasService } from 'src/app/services/kepegawaian/petugas/petugas.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponentIzin implements OnInit {

  IzinData= new IzinTugasModel();
  tanggal= new Date()
  petugas: any
  page!: 1;
  offset!: 10;

  constructor(
    public dialogRef: MatDialogRef<ActionComponentIzin>,
    private IzinTugas: IzinPetugasService,
    private PetugasService: PetugasService,
    @Inject(MAT_DIALOG_DATA) public data: IzinTugasModel
  ) {
    if (data){
      this.IzinData = data;
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
      if (!this.IzinData.id_pegawai){
        validation = true;
        text = 'Petugas harus  dipilih';
      }else if (!this.IzinData.tanggal){
        validation = true;
        text = 'Tanggal harus diisi';
      }else if (!this.IzinData.deskripsi){
        validation = true;
        text = 'Deskripsi harus diisi';
      }else if (!this.IzinData.id_pegawai_pengganti){
        validation = true;
        text = 'Petugas pengganti harus dipilih';
      }else if (this.IzinData.id_pegawai === this.IzinData.id_pegawai_pengganti){
        validation = true;
        text = 'Petugas tidak boleh sama dengan Petugas pengganti';
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
        id: this.IzinData.id,
        id_pegawai: this.IzinData.id_pegawai,
        deskripsi: this.IzinData.deskripsi,
        tanggal: this.IzinData.tanggal,
        id_pegawai_pengganti: this.IzinData.id_pegawai_pengganti
      };
      if (this.IzinData.id){
        this.IzinTugas.Update(param).subscribe(
          data => {
            if(data){
              this.dialogRef.close('Mengubah data');
            }
          }
        );
      }else{
        this.IzinTugas.save(param).subscribe(
          data => {
            if(data){
              this.dialogRef.close('Menambah data');
            }
          }
        );
      }
  }
}
