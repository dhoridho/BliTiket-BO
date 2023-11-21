import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private gService: GlobalService ) { }

  getAllData = (page: number, offset: number) => {
    return this.gService.Get('user',(page && offset) ? `?page=${page}&offset=${offset}` : '');
  }

  save = (service: any) => {
    return this.gService.Post('user', service);
  }

  Update =(service: any) =>{
    return this.gService.Put(`user/${service.id}`, service);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`user`, id);
  }

  resetPassword = (id: any) =>{
    return this.gService.Post(`auth/reset-password/${id}`, id);
  }

  Logout(service: any){
    return this.gService.Post('logout', service);
  }

}
