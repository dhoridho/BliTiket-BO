import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { RekanDukunganService } from 'src/app/services/master-data/rekan-dukungann/rekan-dukungan.service';
import { environment } from 'src/environments/environment';
import { ActionComponentRekan } from './action/action.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';


@Component({
  selector: 'app-rekan-dukungan',
  templateUrl: './rekan-dukungan.component.html',
  styleUrls: ['./rekan-dukungan.component.scss']
})
export class RekanDukunganComponent implements OnInit {
  page = 1;
  offset = 10;
  totalData = 0;
  rekan: any;
  imageUrl = environment.APIIMAGE

  constructor(
    private dialog: MatDialog,
    private rekanDukunganService: RekanDukunganService
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData = (event:any = false) => {
    if (event) {
      this.page = event;
    }
    const param = {
      page: this.page,
      offset: this.offset
    };
    this.rekanDukunganService.getAllData(param).subscribe(
      (resp) => {
        this.rekan = resp.data;
        this.totalData= resp.length;
      }
    );
  }

  action = (rekanData = null) => {
    const dialogRef = this.dialog.open(ActionComponentRekan, {
      width : '800px',
      maxHeight: '100vh',
      data : rekanData
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
    this.rekanDukunganService.Delete(id).subscribe(
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
    const dialogRef = this.dialog.open(ImagePreviewComponent, {
      width : 'auto',
      height: 'auto',
      data : data,
      panelClass: 'custom-dialog-container'
    });
  }

}
