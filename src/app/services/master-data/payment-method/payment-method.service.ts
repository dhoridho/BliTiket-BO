import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  constructor(
    private gService: GlobalService
  ) { }

  getAllData = (param: any) => {
    return this.gService.Get('payment-method', param);
  }

  Save = (body: any) => {
    return this.gService.Post('payment-method', body);
  }

  Update =(body: any, id: number) =>{
    return this.gService.Put(`payment-method/${id}`, body);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`payment-method`, id);
  }
}
