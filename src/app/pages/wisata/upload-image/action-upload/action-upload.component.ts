import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { UploadImageModel } from 'src/app/@core/model/upload-image.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { UploadImageService } from 'src/app/services/upload-image/upload-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-action-upload',
  templateUrl: './action-upload.component.html',
  styleUrls: ['./action-upload.component.scss']
})
export class ActionUploadComponent implements OnInit {

  wisataData = new UploadImageModel();
  fileToUpload: File;
  image: string;
  filename: string;
  idWisataEdit: any;
  imgUrl = environment.APIIMAGE + 'asset/'
  refType = [
    {
      value: 'Banner',
      refTypeName:'Banner'
    },
    {
      value: 'Carousel',
      refTypeName:'Carousel'
    },
    {
      value: 'Detail-Wisata',
      refTypeName:'Detail Wisata'
    }
  ]

  constructor(
    private uploadImageService: UploadImageService,
    public dialogRef: MatDialogRef<ActionUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadImageModel
  ) {
    if(data.wisataId) {
      this.wisataData.id_tempat_wisata = data.wisataId;
    }
    if(data.value) {
      this.idWisataEdit = data.value.id;
      this.wisataData.ref_type = data.value.ref_type;
    }
    }

  ngOnInit(): void {}

  submitData = () => {
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('ref_type', this.wisataData.ref_type);
    formData.append('ref', this.wisataData.id_tempat_wisata);
    if(this.idWisataEdit){
      this.uploadImageService.update(formData, this.idWisataEdit).subscribe(
        (resp) => {
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
      this.uploadImageService.save(formData).subscribe(
        (resp) => {
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
