import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class JenisPendapatanService {

  constructor(
    private gService: GlobalService
  ) { }

  getAllData = (page: number, offset: number) => {
    return this.gService.Get('tarif-parkir', (page && offset) ? `?page=${page}&offset=${offset}` : '');
  }

  Update =(id: number, jenisPendapatan: any) =>{
    return this.gService.Put(`hasil-pendapatan-usaha/${id}`, jenisPendapatan);
  }

}
