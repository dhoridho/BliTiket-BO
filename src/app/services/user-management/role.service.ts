import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private gService: GlobalService) { }

  getAllData = (page = 0, offset = 0) => {
    return this.gService.Get('roles', (page && offset) ? `?page=${page}&offset=${offset}` : '');
  }

  Save = (roleData: any) => {
    return this.gService.Post('roles', roleData);
  }

  SaveRoleMenu = (roleData: any) => {
    return this.gService.Post('menu-roles', roleData);
  }

  Update =(roleData: any) =>{
    return this.gService.Put(`roles/${roleData.id}`, roleData);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`roles`, id);
  }
}
