import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, noop, Observable, of, tap } from 'rxjs';
import { userItem } from '../models/user.model';

@Injectable({ providedIn: "root" })
export class UserService {
  emptyUser = <userItem>{ username: '' }
  currentUser$: BehaviorSubject<userItem> = new BehaviorSubject(this.emptyUser);

  constructor(
    private http: HttpClient
  ) {
    this.getUserSession().subscribe(noop)
  }

  public getUserSession() {
    return this.http.get<userItem>('/api/user/session')
      .pipe(
        catchError(e => of(e)),
        filter(res => Object.keys(res).length !== 0),
        tap(res => this.currentUser$.next(res)),
      )
  }

  public logout() {
    return this.http.get('/api/user/logout')
      .subscribe(_ => {
        this.currentUser$.next(this.emptyUser);
      });
  }

  public getAllRoles() {
    return this.http.get<userItem['role'][]>('/api/roles')
  }

  public getAllUsers(): Observable<userItem[]> {
    return this.http.get<userItem[]>('/api/users')
  }

  public submitLogin(user: userItem): Observable<userItem> {
    return this.http.post<userItem>('/api/user/login', user, {
      withCredentials: true
    })
  }

  public submitSignup(user: userItem): Observable<userItem> {

    return this.http.post<userItem>('/api/user/create', user, {
      withCredentials: true
    })
  }

  public updateUser(user: userItem) {
    let username = user.username;
    let role = user.role;
    return this.http.patch('/api/user/update', { username, role })
  }

}