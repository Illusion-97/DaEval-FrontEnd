import {API_URL} from './../../environments/environment';
import {Observable} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUserValue;
    // si localstorage est renseigné et qu'on a token et que l'url appelée correspond à l'api REST Java
    if (currentUser && currentUser.token && req.url.startsWith(API_URL)) {
      // on clone la req pour ajouter une entête
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    // on laisse continuer
    return next.handle(req);
  }
}
