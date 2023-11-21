import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { AcaraService } from 'src/app/services/master-data/acara/acara.service';
import { environment } from 'src/environments/environment';
import { ActionComponentAcara } from './action/action.component';
import { ImagePreviewAcaraComponent } from './image-preview-acara/image-preview-acara.component';

@Component({
  selector: 'app-acara',
  templateUrl: './acara.component.html',
  styleUrls: ['./acara.component.scss']
})
export class AcaraComponent implements OnInit {
  acara: any;
  totalData= 0;
  page = 1;
  offset = 10;
  imgUrl = environment.APIIMAGE;

  constructor(
    private dialog: MatDialog,
    private acaraService: AcaraService
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData = (event: any = false) => {
    if (event) {
      this.page = event;
    }
    const param = {
      page: this.page,
      offset: this.offset
    };
    this.acaraService.getAllData(param).subscribe(
      (resp)=>{
        this.acara = resp.data;
        this.totalData = resp.length;
      }
    );
  }


  action = (acaraData = null) => {
    const dialogRef = this.dialog.open(ActionComponentAcara, {
      width : '800px',
      maxHeight: '100vh',
      data : acaraData
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
          this.getAllData();
        }
      }
    );
  }

  deleteData = (id: number) => {
    this.acaraService.Delete(id).subscribe(
      data => {
        if(data){
          const rulesAlert: RulesSweetAlert = {
            title: 'Dihapus',
            text: 'Data berhasil dihapus!',
            icon: 'success',
            showCancelButton: false
          };
  
          sweetAlert(rulesAlert);
          this.getAllData();
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

  previewImage = (data: any) => {
    this.dialog.open(ImagePreviewAcaraComponent, {
      width : 'auto',
      height: 'auto',
      data : data,
      panelClass: 'custom-dialog-container'
    });
  }

}
