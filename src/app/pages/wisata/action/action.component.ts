import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select2Option, Select2UpdateEvent } from 'ng-select2-component';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { WisataModel } from 'src/app/@core/model/wisata.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { LokasiService } from 'src/app/services/lokasi/lokasi.service';
import { WisataService } from 'src/app/services/wisata/wisata.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  wisataData: WisataModel = new WisataModel();
  lokasis: any [] = [];
  page = 1
  offset= 999999;

  constructor(
    private wisataService: WisataService,
    private lokasiService: LokasiService,
    public dialogRef: MatDialogRef<ActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WisataModel
  ) {
    if(data){
      setTimeout(() => {
        this.wisataData = data;
      }, 500)
    }
   }

  ngOnInit(): void {
    this.getAllLokasi();
  }

  getAllLokasi = () => {
    this.lokasiService.getAllData(this.page, this.offset).subscribe(
      (resp) => {
        // this.lokasis = resp.data;
        this.convertDataSelectTwo(resp.data);
      }
    );
  }

  convertDataSelectTwo = (data: any) => {
    data.forEach((element: any) => {
      const newData: any = {
          options: [
              { value: element.id, label: element.nama_lokasi }
          ]
      };
      this.lokasis.push(newData);
    });
  }

  // change(event: Event) {
  //   console.log( event);
  // }

  // search(text: string) {
  //   this.lokasis = text
  //       ? (JSON.parse(JSON.stringify(this.lokasis)) as Select2Option[]).filter(
  //             option => option.label.toLowerCase().indexOf(text.toLowerCase()) > -1
  //         )
  //       : JSON.parse(JSON.stringify(this.lokasis));
  // }

  update(event: any) {
    this.wisataData.id_lokasi = event.value;
  }

  submitData = () => {
    let validation = false;
    let text = '';
    if (!this.wisataData.nama_tempat_wisata){
      validation = true;
      text = 'Nama tempat wisata harus diisi';
    }else if (!this.wisataData.id_lokasi){
      validation = true;
      text = 'Lokasi harus dipilih';
    }else if (!this.wisataData.description){
      validation = true;
      text = 'Deskripsi harus isi';
    }else if (!this.wisataData.active){
      validation = true;
      text = 'Status harus dipilih';
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
      id: this.wisataData.id,
      nama_tempat_wisata:this.wisataData.nama_tempat_wisata,
      description:this.wisataData.description,
      id_lokasi: this.wisataData.id_lokasi,
      active: this.wisataData.active
    };
    if(this.wisataData.id){
      this.wisataService.Update(param).subscribe(
        (resp) => {
          if(resp){
            this.dialogRef.close('Mengubah data');
          }
        }
      );
    }else{
      this.wisataService.save(param).subscribe(
        (resp) => {
          if(resp){
            this.dialogRef.close('Menambah data');
          }
        }
      );
    }
  }

}
