import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AUTH_TOKEN, USER_ID } from './constants';


@Injectable()
export class AuthService {
  private userId = '';
  private isUserAuthenticated = new BehaviorSubject(false);
  constructor() {
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isUserAuthenticated.asObservable();
  }

  public setUserId(id: string): void {
    this.userId = id;
    this.isUserAuthenticated.next(true);
  }

  public saveUserData(id: string, token: string): void {
    localStorage.setItem(USER_ID, id);
    localStorage.setItem(AUTH_TOKEN, token);
    this.setUserId(id);
  }

  public logout(): void {
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(AUTH_TOKEN);
    this.userId = null;
    this.isUserAuthenticated.next(false);
  }

  public autoLogin(): void {
    const id = localStorage.getItem(USER_ID);
    if (id) {
      this.setUserId(id);
    }
  }
}
