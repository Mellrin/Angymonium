import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(
    private http: HttpClient
  ) { }


  public submitLogin(user: User): Observable<IUser> {
    const body = { username: user.username, password: user.password }

    return this.http.post<User>('/api/user/login', body, {
      withCredentials: true
    })
  }

}