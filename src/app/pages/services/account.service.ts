import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpService } from '../../@core/backend/common/api/http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl: any;
  url: string;
  private readonly apiController: string = 'accounts';

  constructor(private http: HttpService) {
    this.baseUrl = environment.apiUrl;
    this.url = '';
  }

  accountList(data: any): Observable<any> {
    this.url = this.apiController + '/accountList';
    let obj: any = {};
    obj.url = this.url;
    obj.postData = data;

    return this.http.post(this.url, data);
  }

  accountAdd(data: any): Observable<any> {
    this.url = this.apiController + '/addAccount';
    let obj: any = {};
    obj.url = this.url;
    obj.postData = data;

    return this.http.post(this.url, data);
  }

  accountUpdate(data: any): Observable<any> {
    this.url = this.apiController + '/updateAccount';
    let obj: any = {};
    obj.url = this.url;
    obj.postData = data;

    return this.http.post(this.url, data);
  }

  accountDelete(data: any): Observable<any> {
    this.url = this.apiController + '/deleteAccount';
    let obj: any = {};
    obj.url = this.url;
    obj.postData = data;

    return this.http.post(this.url, data);
  }
}
