import { DatePipe } from '@angular/common';
export class FilterDashboardModel{
    type: any;
    startDate: any = this.DatePipe.transform(date, "yyyy-MM-dd");
    endDate: any = null;
}