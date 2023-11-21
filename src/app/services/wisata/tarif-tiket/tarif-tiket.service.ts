import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class TarifTiketService {

  constructor(
    private gService: GlobalService
  ) { }

  getAllData = (page: number, offset: number) => {
    return this.gService.Get('tarif-tiket', (page && offset) ? `?page=${page}&offset=${offset}` : '');
  }

  save = (body: any) => {
    return this.gService.Post('tarif-tiket', body);
  }

  Update =(tarifTicket: any) =>{
    return this.gService.Put(`tarif-tiket/${tarifTicket.id}`, tarifTicket);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`tarif-tiket`, id);
  }
}
