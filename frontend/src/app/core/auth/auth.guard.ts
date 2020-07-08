import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Store} from '@ngxs/store';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserState } from 'src/app/state/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {

    if (this.store.selectSnapshot(UserState.isLoggedIn)) {
      return true;
    }

    return this.router.parseUrl('login');
  }

}
