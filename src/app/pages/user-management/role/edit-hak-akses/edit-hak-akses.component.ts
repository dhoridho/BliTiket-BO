import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleModel } from 'src/app/@core/model/role.model';
import { MenuService } from 'src/app/services/user-management/menu.service';
import { RoleService } from 'src/app/services/user-management/role.service';

@Component({
  selector: 'app-edit-hak-akses',
  templateUrl: './edit-hak-akses.component.html',
  styleUrls: ['./edit-hak-akses.component.scss']
})
export class EditHakAksesComponent implements OnInit {
  roleData = new RoleModel();
  menus: any;
  menusRaw: any;
  page = 1;
  offset = 10;
  activeMenu: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditHakAksesComponent>,
    private menuService: MenuService,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: RoleModel
  ) {
    if (data){
     this.roleData = data;
    }
  }

  ngOnInit(): void {
    this.getAllMenu();
    this.getActiveMenu();
  }

  getAllMenu = () => {
    this.menuService.getAllData(this.page, this.offset).subscribe(
      (resp) => {
        this.menusRaw = resp.data;
        let menu = resp.data.filter((value: any) => value.level === 1);
        const subMenu = resp.data.filter((value: any) => value.level === 2);
        menu = menu.map((value: any) => {
          const child = subMenu.filter((valueSub: any) => valueSub.parent_menu_id === value.id);
          value.child = child;
          return value;
        });
        this.menus = menu;
      }
    );
  }

  getActiveMenu = () => {
    this.menuService.getRoleMenu(this.page, this.offset, this.roleData.id).subscribe(
      (resp) => {
        this.activeMenu = resp.data.map((value : any) => value.menu_id);
      }
    );
  }

  btnHideAndShow = (id: number) => {
    if (document.getElementById(`child-${id}`)?.classList.contains('d-none')){
      document.getElementById(`icon-${id}`)?.classList.remove('bx-plus');
      document.getElementById(`child-${id}`)?.classList.remove('d-none');
      document.getElementById(`icon-${id}`)?.classList.add('bx-minus');
    }else{
      document.getElementById(`icon-${id}`)?.classList.remove('bx-minus');
      document.getElementById(`child-${id}`)?.classList.add('d-none');
      document.getElementById(`icon-${id}`)?.classList.add('bx-plus');
    }
  }

  onCheck = (event: any) => {
    const {id, checked} = event.target;

    const idSplit = id.split('-');
    const idRecord = parseInt (idSplit[1]);

    this.checkArray(idRecord, checked);
  }

  checkArray = (id: number, checked: boolean) => {
    if (checked){
      this.activeMenu.push(id);
      const selectedMenu = this.menusRaw.filter((value: any) => value.parent_menu_id === id);
      //proses check seluruh child
      if (selectedMenu.length > 0){
        for (const child of selectedMenu){
          if (!this.activeMenu.includes(child.id)){
            this.activeMenu.push(child.id);
          }
        }
      }
      //proses check parent jika belum ter check
      const checkedMenu = this.menusRaw.find((value: any) => value.id === id);
      const parentMenu = this.menusRaw.find((value: any) => value.id === checkedMenu.parent_menu_id);
      if(parentMenu){
        if (!this.activeMenu.includes(parentMenu.id)){
          this.activeMenu.push(parentMenu.id);
        }
      }
    }else{
      const activeMenuFoundIndex = this.activeMenu.findIndex(value => id === value);
      if (activeMenuFoundIndex !== -1){
        this.activeMenu.splice(activeMenuFoundIndex, 1);
      }

      const selectedMenu = this.menusRaw.filter((value: any) => value.parent_menu_id === id);
      //proses uncheck seluruh child
      if (selectedMenu.length > 0){
        for (const child of selectedMenu){
          const activeChildMenuFoundIndex = this.activeMenu.findIndex(value => child.id === value);
          if (activeChildMenuFoundIndex !== -1){
            this.activeMenu.splice(activeChildMenuFoundIndex, 1);
          }
        }
      }
      //proses uncheck parent jika semua child tidak ter check
      const checkedMenu = this.menusRaw.find((value: any) => value.id === id);
      const siblingMenu = this.menusRaw.filter((value: any) => value.parent_menu_id === checkedMenu.parent_menu_id);
      if (siblingMenu.length > 0){
        let uncheckAll = true;
        for (const sibling of siblingMenu){
          if (this.activeMenu.includes(sibling.id)){
            uncheckAll = false;
          }
        }
        if (uncheckAll){
          const activeParentMenuFoundIndex = this.activeMenu.findIndex(value => checkedMenu.parent_menu_id === value);
          if (activeParentMenuFoundIndex !== -1){
            this.activeMenu.splice(activeParentMenuFoundIndex, 1);
          }
        }
      }
    }
  }

  submitData = () => {
    const param = {
      role_id : this.roleData.id,
      menu_id : this.activeMenu
    };
    this.roleService.SaveRoleMenu(param).subscribe(
      data => {
        if(data){
          this.dialogRef.close('Menambah data');
        }
      }
    );
  }

}
