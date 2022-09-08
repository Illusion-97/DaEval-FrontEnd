import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {LibraryService} from './library.service';
import {LoginDto, LoginResponseDto} from '../models/Login';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<LoginResponseDto>;

  constructor(private service: LibraryService) {
    const lsVal = sessionStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<LoginResponseDto>(JSON.parse(lsVal));
    this.currentUser = this.currentUserSubject.asObservable();
  }


public get currentUserValue(): LoginResponseDto {
  return this.currentUserSubject.value;
}

  login(infos: LoginDto) {
      return this.service.login(infos)
          .pipe(map(result => {
              sessionStorage.setItem('currentUser', JSON.stringify(result));
              this.currentUserSubject.next(result);
              return result;
          }));
  }

  logout() {
    sessionStorage.clear();
    this.currentUserSubject.next(undefined);
  }

}
