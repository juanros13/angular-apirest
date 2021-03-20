import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private router: Router
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isAuthenticated()){
      if(this.isTokenExpires()){
        this.authService.logout();
        this.router.navigate(['/auth/login'])
        return false;
      }
      return true;
    }else{
      this.router.navigate(['/auth/login'])
      return false;
    }
    
  }
  isTokenExpires():boolean{
    let token = this.authService.token;
    let payload = this.authService.obteneDatosPayload(token);
    let now = new Date().getTime() / 1000;
    if(payload.exp < now){
      return true;
    }else{
      return false;
    }
  }
  
}
