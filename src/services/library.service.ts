import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, finalize, Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpParams} from '@angular/common/http';
import {API_SERVICE_BY_TYPE, API_URL, DTO_TYPES} from '../environments/environment';
import {ParamMap} from '@angular/router';
import {Select} from '../models/Select';
import {ReturnObject} from '../models/return-object';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  select: BehaviorSubject<Select> = new BehaviorSubject<Select>(undefined);
  navigate: EventEmitter<Select> = new EventEmitter<Select>();
  update: EventEmitter<Select> = new EventEmitter<Select>();
  parents: BehaviorSubject<ReturnObject[]> = new BehaviorSubject<ReturnObject[]>([]);
  countByType = new BehaviorSubject<Map<DTO_TYPES, number>>(new Map<DTO_TYPES, number>());

  constructor(private http: HttpClient) {
    this.update.subscribe(next => this.getServerCount());
    this.getServerCount();
  }

  all(type: DTO_TYPES): Observable<HttpEvent<any>> {
    return this.handle('get', type, 'All');
  }

  login(infos) {
    return this.handle('post', DTO_TYPES.UTILISATEURS, 'checkLogin', infos);
  }

  handle(request: string, type: DTO_TYPES, methode: string, body?: any, params?: ParamMap, page?: number, max?: number) {
    const service = API_SERVICE_BY_TYPE.get(type);
    if (!service) {
      console.log(type);
    }
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
    if (params) {
      params.keys.forEach(key => httpParams = httpParams.append(key, params.get(key)));
    }
    return httpParams;
  }

  getHttpPageParams(httpParams: HttpParams, page?: number, max?: number): HttpParams {
    if (page !== undefined && max !== undefined) {
      httpParams = httpParams.append('page', page);
      httpParams = httpParams.append('max', max);
    }
    return httpParams;
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
    if (params) {
      params.forEach((value, key) => httpParams = httpParams.append(key, value));
    }
    return {
      params: this.getHttpPageParams(httpParams, page, max)
    };
  }

  get(url: string, options): Observable<HttpEvent<any>> {
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

  getServerCount(): void {
    const vals = Object.values(DTO_TYPES).filter((v) => !isNaN(Number(v)) && API_SERVICE_BY_TYPE.has(v as DTO_TYPES));
    const size = vals.length;
    const counts = new Map<DTO_TYPES, number>();
    vals.forEach((value, index) => {
      this.handle('get', index, 'Count').pipe(finalize(() => {
        if (index === (size - 1)) {
          this.countByType.next(counts);
        }
      })).subscribe({
        next: count => {
          counts.set(index, count['body']);
        },
        error: () => counts.set(index, 0)
      });
    });
  }

  getForSelect(type: DTO_TYPES, page: number, max: number, method: string = 'AllByPage', vals?: Map<string, string>): Observable<any[]> {
    return this.http.get<any[]>(this.getUrl(API_SERVICE_BY_TYPE.get(type), method), this.getPageOptions(page, max, vals));
  }
}
