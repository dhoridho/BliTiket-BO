import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcaraModel } from 'src/app/@core/model/acara.model';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { AcaraService } from 'src/app/services/master-data/acara/acara.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponentAcara implements OnInit {
  acaraData = new AcaraModel();
  fileToUpload: File;
  image: string;
  filename: string;
  imgUrl = environment.APIIMAGE;

  constructor(
    private acaraService: AcaraService,
    public dialogRef: MatDialogRef<ActionComponentAcara>,
    @Inject(MAT_DIALOG_DATA) public data: AcaraModel
  ) { 
    if (data){
      this.acaraData = data;
    }
  }

  ngOnInit(): void {
  }

  submitData = () => {
    let validation = false;
    let text = '';
    if (!this.acaraData.nama_acara){
      validation = true;
      text = 'Acara harus diisi';
    }else if (!this.acaraData.tanggal){
      validation = true;
      text = 'Tanggal harus diisi';
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
    formData.append('nama_acara', this.acaraData.nama_acara);
    formData.append('tanggal', this.acaraData.tanggal);
    if(this.acaraData.id){
      this.acaraService.Update(formData, this.acaraData.id).subscribe(
        (resp) => {
          if(resp){
            this.dialogRef.close('Mengubah data');
          }
        }
      );
    }else{
      this.acaraService.save(formData).subscribe(
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
