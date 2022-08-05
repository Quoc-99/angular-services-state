import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { withLatestFrom } from 'rxjs/operators';
import { User } from '../../models/user';
import { AppContext } from '../../services/app-context.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  template: `
    <nav>
      <h4>Angular Vietnam v{{ version }}</h4>
      <button *ngIf="isLoggedIn; else notLoggedIn" (click)="logOut()">
        I am {{ user?.name }}, and I like {{ user?.likes }} and dislike
        {{ user?.dislikes }} pokemons / Log Out
      </button>
      <ng-template #notLoggedIn>
        <button (click)="logIn()">Log In</button>
      </ng-template>
    </nav>
  `,
  styles: [
    `
      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: hotpink;
        color: white;
      }

      h4 {
        margin: 0;
        font-size: 2rem;
      }

      button {
        background: transparent;
        outline: none;
        border: 1px solid;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        font-family: 'Source Sans Pro';
      }
    `
  ]
})
export class NavbarComponent {
  version = VERSION.full;
  user: User;
  isLoggedIn = false;

  constructor(private appContext: AppContext, private auth: AuthService) {
    this.appContext.user$
      .pipe(withLatestFrom(this.appContext.isAuthenticated$))
      .subscribe(([user, isAuthenticated]) => {
        this.isLoggedIn = isAuthenticated;
        this.user = user;
      });
  }

  logIn() {
    this.auth.login();
  }

  logOut() {
    this.auth.logout();
  }
}
