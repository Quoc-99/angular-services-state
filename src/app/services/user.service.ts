import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { StorageService, STORAGE_KEYS } from './storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private storage: StorageService) {}

  getDetails(): Observable<User> {
    return of({
      name: 'Tuan',
      likes: 0,
      dislikes: 0,
      ...this.storage.get<User>(STORAGE_KEYS.USER)
    });
  }

  increaseLikes(): Observable<User> {
    return this.getDetails().pipe(
      map((user: User) => {
        user = {
          ...user,
          likes: user.likes + 1
        };
        this.storage.set(STORAGE_KEYS.USER, user);
        return user;
      })
    );
  }

  increaseDislikes(): Observable<User> {
    return this.getDetails().pipe(
      map((user: User) => {
        user = {
          ...user,
          dislikes: user.dislikes + 1
        };
        this.storage.set(STORAGE_KEYS.USER, user);
        return user;
      })
    );
  }
}
