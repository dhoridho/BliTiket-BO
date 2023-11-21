import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { TarifParkirModel } from 'src/app/@core/model/tarif-parkir.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { KendaraanService } from 'src/app/services/master-data/kendaraan/kendaraan.service';
import { TarifParkirService } from 'src/app/services/wisata/tarif-parkir/tarif-parkir.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponentTarifParkir implements OnInit {
  tarifParkir = new TarifParkirModel();
  wisataId: any;
  wisataData: any;
  kendaraan: any;
  limit = 999999;
  constructor(
    private KendaraanService: KendaraanService,
    private tarifParkirService: TarifParkirService,
    public dialogRef: MatDialogRef<ActionComponentTarifParkir>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(data.idTempatWisata) {
      this.wisataId = data.idTempatWisata;
    }
    if(data.value) {
      this.tarifParkir = data.value;
    }
   }

  ngOnInit(): void {
    this.getAllKendaraan();
  }

  getAllKendaraan = () => {
    const param = {
      limit : this.limit
    };
    this.KendaraanService.getAllData(param).subscribe(
      (resp) => {
        this.kendaraan = resp.data;
      }
    );
  }

  submitData = () => {
    let validation = false;
    let text = '';
    if (!this.tarifParkir.id_jenis_kendaraan){
      validation = true;
      text = 'Kendaraan harus dipilih';
    }else if (!this.tarifParkir.tarif){
      validation = true;
      text = 'Tarif harus diisi';
    }else if (!this.tarifParkir.quota){
      validation = true;
      text = 'Kuota harus dipilih';
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
      id:this.tarifParkir.id,
      id_tempat_wisata: this.wisataId,
      id_jenis_kendaraan: this.tarifParkir.id_jenis_kendaraan,
      tarif: this.tarifParkir.tarif,
      quota: this.tarifParkir.quota
    };
    if(this.tarifParkir.id){
      this.tarifParkirService.Update(param).subscribe(
        (resp) => {
          if(resp){
            this.dialogRef.close('Mengubah data');
          }
        }
      );
    }else{
      this.tarifParkirService.save(param).subscribe(
        (resp) => {
          if(resp){
            this.dialogRef.close('Menambah data');
          }
        }
      );
    }
  }

}
