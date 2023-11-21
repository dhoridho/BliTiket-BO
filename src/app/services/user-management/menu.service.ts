import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private gService: GlobalService) { }

  getAllData = (page: number, offset: number) => {
    return this.gService.Get('menu', (page && offset) ? `?page=${page}&offset=${offset}` : '');
  }

  getRoleMenu = (page: number, offset: number, id_role: any) => {
    return this.gService.Get(`menu-roles/get-by-role-id/${id_role}`, (page && offset) ? `?page=${page}&offset=${offset}` : '');
  }

  getMenu = (page: number, offset: number) => {
    return this.gService.Get('auth/get-menu-access', (page && offset) ? `?page=${page}&offset=${offset}` : '');
  }

  save = (menuDatas: any) => {
    return this.gService.Post('menu', menuDatas);
  }

  Update =(menuDatas: any) =>{
    return this.gService.Put(`menu/${menuDatas.id}`, menuDatas);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`menu`, id);
  }
}
