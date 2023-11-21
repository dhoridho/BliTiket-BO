import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { sweetAlert } from '../inheritComponent/helper/helper';
import { RulesSweetAlert } from '../@core/model/global-swal-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
) {}
  ParamGet = (object: any) => {
    let param = '';
    let i = 0;
    for (const val in object){
        if (i === 0){
            param += `?${val}=${object[val]}`;
        }else{
            param += `&${val}=${object[val]}`;
        }
        i++;
    }
    return param;
}

    Get = (path: any, params: any = '') => {
        if (typeof params === 'object' && params !== null){
            params = this.ParamGet(params);
        }
        const url = environment.APIURL + path + params;
        return this.http.get(url)
        .pipe(
            map((response: any) => {
                return response;
            }),
            catchError((e: Response) => this.handleError(e))
        );
    }

    GetById = (path: any, body: any = '') => {
        const url = environment.APIURL + path + body;
        return this.http.get(url)
        .pipe(
            map((response: any) => {
                return response;
            }),
            catchError((e: Response) => this.handleError(e))
        );
    }

    PostWithRequestUrl = (path: any, body: any) => {
        if (typeof body === 'object' && body !== null){
            body = this.ParamGet(body);
        }
        const url = environment.APIURL + path + body;
        return this.http.post(url, {})
        .pipe(
            map((response: any) => {
                return response;
            }),
            catchError((e: Response) => this.handleError(e))
        );
    }

    Post = (path: any, body: any) => {
        const url = environment.APIURL + path;
        return this.http.post(url, body)
        .pipe(
            map((response: any) => {
                return response;
            }),
            catchError((e: Response) => this.handleError(e))
        );
    }

    PostWithFormData = (path: any, body: any) => {
        const headers = new HttpHeaders({
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json'
        });
        const url = environment.APIURL + path;
        return this.http.post(url, body)
        .pipe(
            map((response: any) => {
                return response;
            }),
            catchError((e: Response) => this.handleError(e))
        );
    }

    Put = (path: any, body: any) => {
        const url = environment.APIURL + path;
        return this.http.put(url, body)
        .pipe(
            map((response: any) => {
                return response;
            }),
            catchError((e: Response) => this.handleError(e))
        );
    }

    PutWithFormData = (path: any, body: any) => {
        const url = environment.APIURL + path;
        return this.http.put(url, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json'
            }
        })
        .pipe(
            map((response: any) => {
                return response;
            }),
            catchError((e: Response) => this.handleError(e))
        );
    }

    Delete = (path: any, id: any) => {
        const url = environment.APIURL + path + '/' + id;
        return this.http.delete(url)
        .pipe(
            map((response: any) => {
                return response;
            }),
            catchError((e: Response) => this.handleError(e))
        );
    }

    private handleError = (resp: any): any => {
        const errMsg = resp.error.message;
        if (resp.status === 401){
            const rulesAlert: RulesSweetAlert = {
                title: 'Failed',
                text: 'Sesi kamu sudah berakhir',
                icon: 'error',
                showCancelButton: false
            };
            sweetAlert(rulesAlert);
            this.authService.logOut();
        }else{
            const rulesAlert: RulesSweetAlert = {
                title: 'Failed',
                text: errMsg,
                icon: 'error',
                showCancelButton: false
            };
            sweetAlert(rulesAlert);
        }
        return throwError(errMsg);
    }
}
