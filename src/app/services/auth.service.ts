import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppContext } from './app-context.service';
import { StorageService, STORAGE_KEYS } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private storage: StorageService,
    private readonly router: Router,
    private appContext: AppContext
  ) {}

  isAuthenticated(): boolean {
    const token = this.storage.get<string>(STORAGE_KEYS.TOKEN);
    return Boolean(token);
  }

  login() {
    this.storage.set(STORAGE_KEYS.TOKEN, 'THIS_IS_FAKE_TOKEN');
    this.appContext.setAuthenticated(true);
    this.router.navigate(['/']);
  }

  logout() {
    this.storage.remove(STORAGE_KEYS.TOKEN);
    this.appContext.setAuthenticated(false);
    this.appContext.setUser(null);
    this.router.navigate(['/not-auth']);
  }
}
