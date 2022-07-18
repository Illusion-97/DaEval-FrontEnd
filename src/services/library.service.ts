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

  handle(request: string, type: DTO_TYPES, methode: string, body?: any, params?: ParamMap) {
    const service = API_SERVICE_BY_TYPE.get(type);
    switch (request) {
      case 'get':
        return this.get(this.getUrl(service, methode), this.getOptions(params));
      case 'post':
        return this.post(this.getUrl(service, methode), body, this.getOptions(params));
      case 'put':
        return this.put(this.getUrl(service, methode), body, this.getOptions(params));
      case 'delete':
        return this.delete(this.getUrl(service, methode), this.getOptions(params));
      default:
        return undefined;
    }
  }

  getUrl(service: string, methode: string): string {
    const url = API_URL + service + '/' + methode;
    console.log(url);
    return url;
  }

  getHttpParams(params?: ParamMap): HttpParams {
    let httpParams = new HttpParams();
    if (params) { params.keys.forEach(key => httpParams = httpParams.append(key, params.get(key))); }
    return httpParams;
  }

  getOptions(params?: ParamMap) {
    return {
      observe: 'events',
      reportProgress: true,
      params: this.getHttpParams(params)
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

}
