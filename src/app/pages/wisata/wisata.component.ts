import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { WisataModel } from 'src/app/@core/model/wisata.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { WisataService } from 'src/app/services/wisata/wisata.service';
import { ActionComponent } from './action/action.component';
import { EditorWisataComponent } from './editor-wisata/editor-wisata.component';
import { UploadImageComponent } from './upload-image/upload-image.component';

@Component({
  selector: 'app-wisata',
  templateUrl: './wisata.component.html',
  styleUrls: ['./wisata.component.scss']
})
export class WisataComponent implements OnInit {
  totalData = 10;
  wisata: WisataModel[] = []
  page = 1;
  offset = 10;
  wisataId: number;

  constructor(
    private dialog: MatDialog,
    private wisataService: WisataService
  ) { }

   ngOnInit(): void {
    this.getAll();
  }

  getAll = (event: any = null) => {
    if (event) {
      this.page = event;
    }
    this.wisataService.getAllData(this.page, this.offset).subscribe(
      (resp)=>{
        this.wisata = resp.data;
        this.totalData = resp.length;
      }
    );
  }

  action = (wisataData: WisataModel | null = null) => {
    const dialogRef = this.dialog.open(ActionComponent, {
      width : '800px',
      maxHeight: '100vh',
      data : wisataData
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
          this.getAll();
        }
      }
    );
  }

  editorWisata = (wisataData: WisataModel) => {
    const dialogRef = this.dialog.open(EditorWisataComponent, {
      width:'800px',
      height:'70%',
      data: wisataData
    });
    dialogRef.afterClosed().subscribe(
      
    );
  }

  deleteData = (id: number) => {
    this.wisataService.Delete(id).subscribe(
      data => {
        if (data) {
          const rulesAlert: RulesSweetAlert = {
            title: 'Dihapus',
            text: 'Data berhasil dihapus!',
            icon: 'success',
            showCancelButton: false
          };
  
          sweetAlert(rulesAlert);
          this.getAll();
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

  uploadImage = (wisataId: number) =>{
    const dialogRef = this.dialog.open(UploadImageComponent, {
      width:'800px',
      height:'70%',
      data: wisataId
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
          this.getAll();
        }
      }
    );
  }

}
