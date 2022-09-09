import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

/**
 * Authentification Interceptor
 */
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const cUser = this.authService.currentUserValue;
    if (cUser) {
      return !(!route.routeConfig.path.includes('Panel') && cUser.simpleUserDto.statut === 1);
    }

    // sinon redirection vers la page de /login avec un paramètre returnUrl=state.url return false
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
