import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrConfig } from 'src/app/components/shared/models/toastr.config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
constructor(
  private authService: AuthService, 
  private router: Router,
  private toastr: ToastrService) {
  
}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

  canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.check();
  }
  
  check(): boolean{
    if(this.authService.isAuth()){
      return true;
    }

    this.toastr.error("An error happened, please try again!", "Error", ToastrConfig);
    this.router.navigate(["/"]);
    return false;
  }
  
}
