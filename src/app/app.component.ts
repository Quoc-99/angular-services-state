import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppContext } from './services/app-context.service';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private appContext: AppContext,
    private auth: AuthService,
    private user: UserService
  ) {}

  ngOnInit() {
    this.validateUser();
  }

  validateUser() {
    this.appContext.setAuthenticated(this.auth.isAuthenticated());
    this.appContext.isAuthenticated$
      .pipe(
        switchMap(isAuthenticated => {
          if (isAuthenticated) {
            return this.user.getDetails();
          }
          return of(null);
        })
      )
      .subscribe((user: User | null) => {
        if (Boolean(user)) {
          this.appContext.setUser(user);
        }
      });
  }
}
