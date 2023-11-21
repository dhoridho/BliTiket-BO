import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pad-lampung';

  constructor(
    private loadingService: LoadingService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadingService.showLoading.subscribe (
      show => {
        if (show) {
          this.spinner.show();

        } else {
          this.spinner.hide();
        }
      }
    );
  }
}
