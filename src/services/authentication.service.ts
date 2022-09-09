import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {LibraryService} from './library.service';
import {LoginDto, LoginResponseDto} from '../models/Login';
import {Router} from '@angular/router';
import {HttpEventType} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  public currentUser: Observable<LoginResponseDto>;
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private service: LibraryService, private router: Router) {
    const lsVal = sessionStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<LoginResponseDto>(JSON.parse(lsVal));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUser.subscribe(value => {
      if (!value) {
        this.router.navigate(['/login']);
      }
    });
  }

  public get currentUserValue(): LoginResponseDto {
    return this.currentUserSubject.value;
  }

  login(infos: LoginDto) {
    return this.service.login(infos)
      .pipe(map(result => {
        if (result.type === HttpEventType.Response) {
          sessionStorage.setItem('currentUser', JSON.stringify(result.body));
          this.currentUserSubject.next(result.body);
        }
        return result;
      }));
  }

  logout() {
    sessionStorage.clear();
    this.currentUserSubject.next(undefined);
  }

}
