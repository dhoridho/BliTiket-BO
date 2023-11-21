import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { LokasiModel } from 'src/app/@core/model/lokasi.model';
import { WisataMendatangModel } from 'src/app/@core/model/wisataMendatang.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { LokasiService } from 'src/app/services/lokasi/lokasi.service';
import { WisataMendatangService } from 'src/app/services/master-data/wisata-mendatang/wisata-mendatang.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-action-mendatang',
  templateUrl: './action-mendatang.component.html',
  styleUrls: ['./action-mendatang.component.scss']
})
export class ActionMendatangComponent implements OnInit {
  wisataMendatang = new WisataMendatangModel();
  fileToUpload: File
  image: string;
  filename: string;
  lokasi: any [] = [];
  limit = 999999;
  imgUrl = environment.APIIMAGE;

  constructor(
    public dialogRef: MatDialogRef<ActionMendatangComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WisataMendatangModel,
    private LokasiService: LokasiService,
    private wisataMendatangService: WisataMendatangService
  ) { 
    if(data){
      setTimeout(() => {
        this.wisataMendatang = data;
      }, 500)
    }
  }

  ngOnInit(): void {
    this.getAllLokasi();
  }

  getAllLokasi = () => {
    this.LokasiService.getAllData(this.limit).subscribe(
      (resp) => {
        this.convertDataSelectTwo(resp.data)
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
      this.lokasi.push(newData);
    });
  }

  update(event: any) {
    this.wisataMendatang.id_lokasi = event.value;
  }

  submitData = () => {
    let validation = false;
    let text = '';
    if (!this.wisataMendatang.nama_tempat_wisata){
      validation = true;
      text = 'Acara harus diisi';
    }else if (!this.wisataMendatang.id_lokasi){
      validation = true;
      text = 'Lokaksi harus dipilih';
    }else if (!this.fileToUpload){
      validation = true;
      text = 'Gambar harus dipilih';
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
    const formData = new FormData();
    formData.append('file_gambar', this.fileToUpload);
    formData.append('nama_tempat_wisata', this.wisataMendatang.nama_tempat_wisata);
    formData.append('id_lokasi', this.wisataMendatang.id_lokasi);
    if(this.wisataMendatang.id){
      this.wisataMendatangService.Update(formData, this.wisataMendatang.id).subscribe(
        (resp) => {
          if(resp){
            this.dialogRef.close('Mengubah data');
          }
        }
      );
    }else{
      this.wisataMendatangService.save(formData).subscribe(
        (resp) => {
          if(resp){
            this.dialogRef.close('Menambah data');
          }
        }
      );
    }
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
