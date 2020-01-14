import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,

  Router,
  RouterStateSnapshot
} from "@angular/router"

import { AuthService } from "../auth/auth.service";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.isUserAuthenticated().then((authenticated: boolean) => {
      if (authenticated) {
        return true;
      } else {
        console.log("access deneid");
        this.router.navigate(["/"]);
      }
    })






  }


}
