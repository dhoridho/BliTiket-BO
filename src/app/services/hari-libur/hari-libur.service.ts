import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class HariLiburService {

  constructor(private gService: GlobalService) { }

  getAllData = (param: any) => {
    return this.gService.Get('hari-libur', param);
  }

  save = (hariLibur: any) => {
    return this.gService.Post('hari-libur', hariLibur);
  }

  Update =(hariLibur: any) =>{
    return this.gService.Put(`hari-libur/${hariLibur.id}`, hariLibur);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`hari-libur`, id);
  }
}
