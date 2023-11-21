import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class ToiletService {

  constructor(
    private gService: GlobalService
  ) { }

  getAllData = (page: number, offset: number) => {
    return this.gService.Get('toilet', (page && offset) ? `?page=${page}&offset=${offset}` : '');
  }

  save = (body: any) => {
    return this.gService.Post('toilet', body);
  }

  Update =(toilet: any) =>{
    return this.gService.Put(`toilet/${toilet.id}`, toilet);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`toilet`, id);
  }
}
