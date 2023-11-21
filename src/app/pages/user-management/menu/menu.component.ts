import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { MenuService } from 'src/app/services/user-management/menu.service';
import { ActionMenuComponent } from './action-menu/action-menu.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menus: any;
  page!: 1;
  offset!: 10;

  constructor(
    private menuService: MenuService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll = () => {
    this.menuService.getAllData(this.page, this.offset).subscribe(
      (resp) => {
        this.menus = resp.data;
      }
    );
  }

  action = (dataMenu = null) => {
    const dialogRef = this.dialog.open(ActionMenuComponent,
    {
      width : '800px',
      maxHeight: '100vh',
      data : dataMenu
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

  deleteData = (id: number) => {
    this.menuService.Delete(id).subscribe(
      data => {
        if(data){
          const rulesAlert: RulesSweetAlert = {
            title: 'Dihapus',
            text: 'Data berhasil dihapus!',
            icon: 'success',
            showCancelButton: false
          };
          sweetAlert(rulesAlert);
          this.getAll();
        }
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
