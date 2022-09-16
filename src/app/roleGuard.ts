import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private http: HttpClient
  ) { }

  canActivate(): Observable<boolean> | boolean {
    return this.http.get('/api/user/session')
      .pipe(
        tap((el: any) => console.log(el?.isAdmin)),
        map(el => {
          if (!el?.isAdmin) {
            alert('No permission')
          }
          return el?.isAdmin
        })
      )
  }

}