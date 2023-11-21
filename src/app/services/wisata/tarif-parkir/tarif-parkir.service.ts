import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class TarifParkirService {

  constructor(
    private gService: GlobalService
  ) { }

  getAllData = (page: number, offset: number) => {
    return this.gService.Get('tarif-parkir', (page && offset) ? `?page=${page}&offset=${offset}` : '');
  }

  save = (body: any) => {
    return this.gService.Post('tarif-parkir', body);
  }

  Update =(tarifParkir: any) =>{
    return this.gService.Put(`tarif-parkir/${tarifParkir.id}`, tarifParkir);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`tarif-parkir`, id);
  }
}
