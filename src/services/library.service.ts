import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpParams} from '@angular/common/http';
import {API_SERVICE_BY_TYPE, API_URL, DTO_TYPES} from '../environments/environment';
import {ParamMap} from '@angular/router';
import {Select} from '../models/Select';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  select: BehaviorSubject<Select> = new BehaviorSubject<Select>(undefined);
  navigate: EventEmitter<Select> = new EventEmitter<Select>();
  update: EventEmitter<Select> = new EventEmitter<Select>();

  constructor(private http: HttpClient) {
  }

  all(type: DTO_TYPES): Observable<HttpEvent<any>> {
    return this.handle('get', type, 'All');
  }

  login(infos) {
    return this.handle('post', DTO_TYPES.UTILISATEURS, 'checkLogin', infos);
  }

  handle(request: string, type: DTO_TYPES, methode: string, body?: any, params?: ParamMap, page?: number, max?: number) {
    const service = API_SERVICE_BY_TYPE.get(type);
    switch (request) {
      case 'get':
        return this.get(this.getUrl(service, methode), this.getOptions(params, page, max));
      case 'post':
        return this.post(this.getUrl(service, methode), body, this.getOptions(params, page, max));
      case 'put':
        return this.put(this.getUrl(service, methode), body, this.getOptions(params, page, max));
      case 'delete':
        return this.delete(this.getUrl(service, methode), this.getOptions(params, page, max));
      default:
        return undefined;
    }
  }

  getUrl(service: string, methode: string): string {
    const url = API_URL + service + '/' + methode;
    return url;
  }

  getHttpParams(params?: ParamMap): HttpParams {
    let httpParams = new HttpParams();
    if (params) { params.keys.forEach(key => httpParams = httpParams.append(key, params.get(key))); }
    return httpParams;
  }

  getHttpPageParams(httpParams: HttpParams, page?: number, max?: number): HttpParams {
    if (page !== undefined && max !== undefined) {
      httpParams = httpParams.append('page', page);
      httpParams = httpParams.append('max', max);
    }
    return  httpParams;
  }

  getOptions(params?: ParamMap, page?: number, max?: number) {
    return {
      observe: 'events',
      reportProgress: true,
      params: this.getHttpPageParams(this.getHttpParams(params), page, max)
    };
  }

  getPageOptions(page: number, max: number, params?: Map<string, string>) {
    let httpParams = new HttpParams();
    if (params) { params.forEach((value, key) => httpParams = httpParams.append(key, value)); }
    return {
      params: this.getHttpPageParams(httpParams, page, max)
    };
  }

  get(url: string, options): Observable<HttpEvent<any>>  {
    return this.http.get<HttpEvent<any>>(url, options);
  }
  post(url: string, body, options): Observable<HttpEvent<any>> {
    return this.http.post<HttpEvent<any>>(url, body, options);
  }
  put(url: string, body, options): Observable<HttpEvent<any>> {
    return this.http.put<HttpEvent<any>>(url, body, options);
  }
  delete(url: string, options): Observable<HttpEvent<any>> {
    return this.http.delete<HttpEvent<any>>(url, options);
  }

  getForSelect(type: DTO_TYPES, page: number, max: number, method: string = 'AllByPage', vals?: Map<string, string>): Observable<any[]> {
    return this.http.get<any[]>(this.getUrl(API_SERVICE_BY_TYPE.get(type), method), this.getPageOptions(page, max, vals));
  }
}
