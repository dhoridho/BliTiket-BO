import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class KendaraanService {

  constructor(
    private gService: GlobalService
  ) { }

  getAllData = (param: any) => {
    return this.gService.Get('jenis-kendaraan', param);
  }

  save = (jenisKendaraan: any) => {
    return this.gService.Post('jenis-kendaraan', jenisKendaraan);
  }

  Update =(jenisKendaraan: any) =>{
    return this.gService.Put(`jenis-kendaraan/${jenisKendaraan.id}`, jenisKendaraan);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`jenis-kendaraan`, id);
  }
}
