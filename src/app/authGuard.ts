import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    return this.http.get('/api/user/session')
      .pipe(
        map(el => {
          if (Object.keys(el).length === 0) {
            this.router.navigateByUrl('user/signin');
            return false
          }
          return true
        })
      )
  }

}