import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { PetugasModel } from 'src/app/@core/model/petugas.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { PetugasService } from 'src/app/services/kepegawaian/petugas/petugas.service';
import { LokasiService } from 'src/app/services/lokasi/lokasi.service';
import { WisataService } from 'src/app/services/wisata/wisata.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  pegawaiData = new PetugasModel();
  page = 1
  offset = 999999
  lokasis: any;
  wisata: any;
  wisatas: any = [];
  locationPlace: any;

  constructor(
    public dialogRef: MatDialogRef<ActionComponent>,
    private PetugasService: PetugasService,
    private LokasiService: LokasiService,
    private WisataService: WisataService,
    @Inject(MAT_DIALOG_DATA) public data: PetugasModel
  ) {
    if (data){
      setTimeout(() => {
        this.pegawaiData = data;
      },500)
    }
  }

  ngOnInit(): void {
    this.getAllLokasi();
    this.getAllWisata();
  }

  getAllLokasi = () => {
    this.LokasiService.getAllData(this.page, this.offset).subscribe(
      (resp) => {
        this.lokasis = resp.data;
      }
    );
  }

  getAllWisata = () => {
    this.WisataService.getAllData(this.page, this.offset).subscribe(
      (resp) => {
        let data = resp.data
        this.wisata = data;
        data.forEach((element: any) => {
          const newData: any = {
              options: [
                  { value: element.id, label: element.nama_tempat_wisata }
              ]
          };
          this.wisatas.push(newData);
        });
        if(this.pegawaiData.id) {
          this.destinationLoader(this.pegawaiData.id_tempat_wisata);
        }
      }
    );
  }

  update(event: any) {
    this.pegawaiData.id_tempat_wisata = event.value;
  }


  submitData = () => {
    let validation = false;
    let text = '';
    if (!this.pegawaiData.nama){
      validation = true;
      text = 'Nama harus  diisi';
    }else if (!this.pegawaiData.nip){
      validation = true;
      text = 'NIP harus diisi';
    }else if (!this.pegawaiData.no_telp){
      validation = true;
      text = 'No telepon harus diisi';
    }else if (!this.pegawaiData.alamat){
      validation = true;
      text = 'Alamat harus diisi';
    }else if (!this.pegawaiData.jenis_pegawai){
      validation = true;
      text = 'Jenis pegawai harus dipilih';
    }else if (!this.pegawaiData.jenis_kelamin){
      validation = true;
      text = 'Jenis Kelamin harus dipilih';
    }else if (!this.pegawaiData.id_tempat_wisata){
      validation = true;
      text = 'Tempat Wisata harus dipilih';
    }else if(!this.pegawaiData.id_lokasi){
      validation = true;
      text = 'Lokasi harus dipilih';
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
      id: this.pegawaiData.id,
      id_lokasi: this.pegawaiData.id_lokasi,
      nama: this.pegawaiData.nama,
      nip: this.pegawaiData.nip,
      no_telp: this.pegawaiData.no_telp,
      jenis_pegawai: this.pegawaiData.jenis_pegawai,
      jenis_kelamin: this.pegawaiData.jenis_kelamin,
      id_tempat_wisata: this.pegawaiData.id_tempat_wisata,
      alamat: this.pegawaiData.alamat
    };
    if (this.pegawaiData.id){
      this.PetugasService.Update(param).subscribe(
        () => {
          this.dialogRef.close('Mengubah data');
        }
      );
    }else{
      this.PetugasService.save(param).subscribe(
        () => {
          this.dialogRef.close('Menambah data');
        }
      );
    }
  }

  destinationPlaceChange = (data: any) =>  {
    this.pegawaiData.id_lokasi = parseInt(data.value);
    this.locationPlace = this.wisata.find((res: any) => res.id === parseInt(data.value));
  }

  destinationLoader = (data: any) => {
    this.pegawaiData.id_lokasi = parseInt(data);
    this.locationPlace = this.wisata.find((res: any) => res.id === parseInt(data));
  }
}
