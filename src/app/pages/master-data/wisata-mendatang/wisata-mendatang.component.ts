import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { WisataMendatangService } from 'src/app/services/master-data/wisata-mendatang/wisata-mendatang.service';
import { environment } from 'src/environments/environment';
import { ActionMendatangComponent } from './action-mendatang/action-mendatang.component';
import { ImagePreviewWisataComponent } from './image-preview-wisata/image-preview-wisata.component';

@Component({
  selector: 'app-wisata-mendatang',
  templateUrl: './wisata-mendatang.component.html',
  styleUrls: ['./wisata-mendatang.component.scss']
})
export class WisataMendatangComponent implements OnInit {
  totalData= 0;
  page = 1;
  offset = 10;
  wisata: any;
  imgUrl = environment.APIIMAGE;

  constructor(
    private wisataMendatang: WisataMendatangService,
    private dialog: MatDialog
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
    this.wisataMendatang.getAllWisataMendatang(param).subscribe(
      (resp) => {
        this.wisata = resp.data;
        this.totalData = resp.length;
      }
    );
  }

  action = (acaraData = null) => {
    const dialogRef = this.dialog.open(ActionMendatangComponent, {
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
    this.wisataMendatang.Delete(id).subscribe(
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
    const dialogRef = this.dialog.open(ImagePreviewWisataComponent, {
      width : 'auto',
      height: 'auto',
      data : data,
      panelClass: 'custom-dialog-container'
    });
  }

}
