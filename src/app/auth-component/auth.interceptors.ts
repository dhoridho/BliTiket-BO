import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private inject: Injector){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authservice = this.inject.get(AuthService);
    req = req.clone({
      setHeaders: {
        Authorization  : `Bearer ${localStorage.getItem('token')}`
      }
    });
    return next.handle(req).pipe(
      );
  }
}
