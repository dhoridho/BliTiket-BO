import { LokasiService } from './../../../services/lokasi/lokasi.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { formatDate, sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { RealisasiService } from 'src/app/services/realisasi/realisasi.service';
import { WisataService } from 'src/app/services/wisata/wisata.service';

@Component({
  selector: 'app-action-realisasi',
  templateUrl: './action-realisasi.component.html',
  styleUrls: ['./action-realisasi.component.scss']
})
export class ActionRealisasiComponent implements OnInit {
  realisasi: any = {
    penerima: 'DISHUB',
    id_tempat_wisata: 0,
    tanggal_transfer: '',
    total_transfer: 0,
    bukti: '',
    bukti_url: ''
  };
  fileToUpload: any;
  filename: string;
  lokasi: any[] = [];
  image: string;
  constructor(
    public dialogRef: MatDialogRef<ActionRealisasiComponent>,
    private realisasiService: RealisasiService,
    private lokasiService: LokasiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(data){
      this.realisasi = data;
    }
   }

  ngOnInit(): void {
    this.getLokasi();
  }

  submitData = () => {
    const form = new FormData();
    form.append('tanggal_transfer', formatDate(this.realisasi.tanggal_transfer));
    form.append('penerima', this.realisasi.penerima);
    form.append('total_transfer', this.realisasi.total_transfer);
    if(this.realisasi.id_lokasi){
      form.append('id_tempat_wisata', '');
      form.append('id_lokasi', this.realisasi.id_lokasi);
    }
    if(this.realisasi.id){
      form.append('bukti_url', this.fileToUpload);
      this.realisasiService.Edit(form, this.realisasi.id).subscribe(
        resp => {
          if (resp.status) {
            this.dialogRef.close('Mengubah data');
          } else {
            const rulesAlert: RulesSweetAlert = {
              title: 'Gagal',
              text: resp.message,
              icon: 'error',
              showCancelButton: false
            };
            sweetAlert(rulesAlert);
          }
        }
      );
    }else{
    form.append('bukti', this.fileToUpload);
      this.realisasiService.Save(form).subscribe(
        resp => {
          if (resp.status) {
            this.dialogRef.close('Menambah data');
          } else {
            const rulesAlert: RulesSweetAlert = {
              title: 'Gagal',
              text: resp.message,
              icon: 'error',
              showCancelButton: false
            };
            sweetAlert(rulesAlert);
          }
        }
      );
    }
  }

  getLokasi = () => {
    this.lokasiService.getAllData(1, 9999).subscribe(
      (resp) => {
        this.lokasi = resp.data;
      }
    );
  }

  openFile = () => {
    document.getElementById('upload')!.click();
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      if (event.target.files && event.target.files[0]) {
        this.fileToUpload = event.target.files.item(0);
        this.filename = event.target.files[0].name;
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.image = reader.result as string;
        };
      }
    }
  }

}
