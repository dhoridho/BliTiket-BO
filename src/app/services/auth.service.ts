import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from './loading/loading.service';
import Swal from 'sweetalert2';
import { RulesSweetAlert } from '../@core/model/global-swal-model';
import { sweetAlert } from '../inheritComponent/helper/helper';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  login = (email: string, password: string) => {
    const param = {
      email,
      password
    };
    const path = 'auth/login';
    const url = environment.APIURL + path;
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    return this.http.post(url, param, {headers})
    .pipe(
      map((response: any) => {
        return response;
      }),
      catchError((e: Response) => this.handleError(e)),
    );
  }

  logout = () => {
    const path = 'auth/logout';
    const url = environment.APIURL + path;
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    return this.http.post(url, {headers})
    .pipe(
      map((response: any) => {
        return response;
      }),
      catchError((e: Response) => this.handleError(e))
    );
  }

  private handleError = (resp: any) => {
    const errMsg = resp.error.message;
    const rulesAlert: RulesSweetAlert = {
      title: 'Failed',
      text: errMsg,
      icon: 'error',
      showCancelButton: false
      };
    sweetAlert(rulesAlert);
    return throwError(errMsg);
  }

  getToken = () => {
    return localStorage.getItem('access_token' || '');
  }

  logOut = () => {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
