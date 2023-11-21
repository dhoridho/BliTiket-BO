import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  constructor(
    private gService: GlobalService
  ) { }

  getAllData = (param: any ) => {
    return this.gService.Get('transaksi-booking', param);
  }

  filter = (filterData:any) =>{
    return this.gService.Get('transaksi-booking', filterData);
  }
}
