import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class WisataMendatangService {

  constructor(
    private gService: GlobalService
  ) { }

  getAllWisataMendatang = (param: any) => {
    return this.gService.Get('comming-soon-wisata', param);
  }

  save = (body: any) => {
    return this.gService.PostWithFormData('comming-soon-wisata', body);
  }

  Update =(body: any, id: number) =>{
    return this.gService.PostWithFormData(`comming-soon-wisata/${id}`, body);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`comming-soon-wisata`, id);
  }
}
