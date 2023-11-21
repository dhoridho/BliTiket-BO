import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private progressService: LoadingService) {}
  removeRequest = () => {
    this.progressService.onHide();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const progress = this.progressService.onShow();
    return next.handle(req).pipe(map(event => {
      if (event instanceof HttpResponse) {
        this.removeRequest();
      }
      return event;
    }), catchError((error) => {
      this.removeRequest();
      return throwError(error);
    }));
  }
}
