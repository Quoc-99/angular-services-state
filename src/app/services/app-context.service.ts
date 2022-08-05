import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AppContext {
  user$: Observable<User>;
  isAuthenticated$: Observable<boolean>;

  private userSubject = new ReplaySubject<User>(1);
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);

  constructor() {
    this.user$ = this.userSubject.asObservable();
    this.isAuthenticated$ = this.isAuthenticatedSubject
      .asObservable()
      .pipe(startWith(false));
  }

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  setAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
  }
}
