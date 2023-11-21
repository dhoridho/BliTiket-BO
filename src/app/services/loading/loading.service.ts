import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public showLoading: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  constructor() { }

  onShow = () => {
    this.showLoading.next(true);
  }

  onHide = () => {
    this.showLoading.next(false);
  }
}
