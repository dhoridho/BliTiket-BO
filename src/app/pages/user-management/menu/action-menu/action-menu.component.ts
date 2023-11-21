import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesSweetAlert } from 'src/app/@core/model/global-swal-model';
import { MenuModel } from 'src/app/@core/model/menu.model';
import { sweetAlert } from 'src/app/inheritComponent/helper/helper';
import { MenuService } from 'src/app/services/user-management/menu.service';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent implements OnInit {
  menuDatas = new MenuModel();
  page: 1;
  offset: 10;
  menus: any;

  constructor(
    public dialogRef: MatDialogRef<ActionMenuComponent>,
    private menuService: MenuService,
    @Inject(MAT_DIALOG_DATA) public data: MenuModel
  ) {
    if (data){
      this.menuDatas = data;
    }
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll = () => {
    this.menuService.getAllData(this.page, this.offset).subscribe(
      (resp) => {
        this.menus = resp.data.filter((value: any) => value.level === 1);
      }
    );
  }

  submitData = () => {
    let validation = false;
    let text = '';
    if (!this.menuDatas.menu_name){
      validation = true;
      text = 'Nama menu harus diisi';
    }else if (!this.menuDatas.url){
      validation = true;
      text = 'Nama url harus diisi';
    }else if (!this.menuDatas.icon){
      validation = true;
      text = 'Nama icon harus dipilih';
    }else if (!this.menuDatas.level){
      validation = true;
      text = 'Level harus dipilih';
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
      id: this.menuDatas.id,
      menu_name: this.menuDatas.menu_name,
      url : this.menuDatas.url,
      icon : this.menuDatas.icon,
      parent_menu_id : this.menuDatas.parent_menu_id,
      level : this.menuDatas.level
    };
    if (this.menuDatas.id){
      this.menuService.Update(param).subscribe(
        resp => {
          if(resp){
            this.dialogRef.close('Mengubah Data');
          }
        }
      );
    }else{
      this.menuService.save(param).subscribe(
        resp => {
          if(resp){
            this.dialogRef.close('Menambah data');
          }
        }
      );
    }
  }

}
