import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { UploadImageModel } from 'src/app/@core/model/upload-image.model';
import { WisataModel } from 'src/app/@core/model/wisata.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { UploadImageService } from 'src/app/services/upload-image/upload-image.service';
import { environment } from 'src/environments/environment';
import { ActionUploadComponent } from './action-upload/action-upload.component';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  wisataData = new UploadImageModel();
  uploadImageData : any;
  fileToUpload: File;
  wisataId: any;
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
  imgUrl = environment.APIIMAGE + 'asset/'

  constructor(
    private UploadImageService: UploadImageService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: WisataModel
  ) { 
    this.wisataId = data;
    this.wisataData.ref_type = 'Banner';
   }

  ngOnInit(): void {
    this.getByRefType();
  }

  getByRefType = () => {
      this.UploadImageService.getByRefTypeAndRef(this.wisataData.ref_type, this.wisataId).subscribe(
        (resp) => {
          this.uploadImageData = resp.data;
        }
      );
  }

  action = (wisataId: any, value: any) => {
    const dialogRef = this.dialog.open(ActionUploadComponent, {
      width : '800px',
      maxHeight: '100vh',
      data: {wisataId, value}
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result){
          const rulesAlert: RulesSweetAlert = {
            title: 'Berhasil',
            text: result,
            icon: 'success',
            showCancelButton: false
          };
          sweetAlert(rulesAlert);
          this.getByRefType();
        }
      }
    );
  }

  deleteData = (id: number) => {
    this.UploadImageService.Delete(id).subscribe(
      data => {
        if(data){
          const rulesAlert: RulesSweetAlert = {
            title: 'Dihapus',
            text: 'Data berhasil dihapus!',
            icon: 'success',
            showCancelButton: false
          };
          sweetAlert(rulesAlert);
          this.getByRefType();
        }
      }, () => {
        const rulesAlert: RulesSweetAlert = {
          title: 'Error!',
          text: 'Gagal menghapus data Data',
          icon: 'error',
          showCancelButton: false
        };
        sweetAlert(rulesAlert);
      }
    );
  }

  confirmBox = (id: number) => {
    const rulesData: RulesSweetAlert = {
      title: 'Apakah anda yakin ingin menghapus data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00000',
      cancelButtonColor: '#00000',
      confirmButtonText: 'Delete',
      action: (result: any) => {
        if (result.isConfirmed) {
          this.deleteData(id);
        }
      }
    };
    sweetAlert(rulesData);
  }

}
