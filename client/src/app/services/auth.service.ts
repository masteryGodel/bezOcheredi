import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AUTH_TOKEN, USER_ID } from './constants';


@Injectable()
export class AuthService {
  private userId: string = null;
  private _isAuthenticated = new BehaviorSubject(false);
  constructor() {
  }

  isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  setUserId(id: string) {
    this.userId = id;
    this._isAuthenticated.next(true);
  }

  saveUserData(id: string, token: string) {
    localStorage.setItem(USER_ID, id);
    localStorage.setItem(AUTH_TOKEN, token);
    this.setUserId(id);
  }

  logout() {
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(AUTH_TOKEN);
    this.userId = null;
    this._isAuthenticated.next(false);
  }

  autoLogin() {
    const id = localStorage.getItem(USER_ID);
    if (id) {
      this.setUserId(id);
    }
  }
}
