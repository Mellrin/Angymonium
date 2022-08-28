import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, noop, Observable, Subject, tap } from 'rxjs';


export interface User {
  username: string;
  password: string;
}

export interface IUser {
  username?: string;
  isAdmin?: boolean;
  error?: string;
  field?: string;
}

@Injectable({ providedIn: "root" })
export class UserService {
  currentUser$: Subject<IUser>;

  constructor(
    private http: HttpClient
  ) {
    this.currentUser$ = new Subject();
    this.getUserSession().subscribe(noop)
  }

  public getUserSession() {
    return this.http.get<IUser>('/api/user/session')
      .pipe(
        filter(res => Object.keys(res).length !== 0),
        tap(res => this.currentUser$.next(res)),
      )
  }

  public logout() {
    return this.http.get('/api/user/logout')
      .subscribe(_ => {
        this.currentUser$.next({ username: '' });
      });
  }

  public getAllUsers() {
    return this.http.get('/api/users')
  }

  public submitLogin(user: User): Observable<IUser> {
    const body = { username: user.username, password: user.password }

    return this.http.post<User>('/api/user/login', body, {
      withCredentials: true
    })
  }

  public submitSignup(user: User): Observable<IUser> {
    console.warn(user)
    const body = { username: user.username, password: user.password }

    return this.http.post<User>('/api/user/signup', body, {
      withCredentials: true
    })
  }

}