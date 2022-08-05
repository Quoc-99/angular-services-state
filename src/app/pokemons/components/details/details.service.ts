import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { pluck, startWith } from 'rxjs/operators';
import { SimplifiedPokemon } from '../../../models/pokemon';
import { AppContext } from '../../../services/app-context.service';
import { BackendService } from '../../../services/backend.service';
import { UserService } from '../../../services/user.service';

interface DetailsState {
  pokemon: SimplifiedPokemon | never;
}

@Injectable()
export class DetailsService {
  state$: Observable<DetailsState>;
  private detailsSubject = new ReplaySubject<DetailsState>(1);

  id = '';

  constructor(
    private route: ActivatedRoute,
    private backend: BackendService,
    private user: UserService,
    private appContext: AppContext,
    private router: Router
  ) {
    this.state$ = this.detailsSubject
      .asObservable()
      .pipe(startWith({ pokemon: null }));

    this.route.params.pipe(pluck('id')).subscribe((id) => {
      this.id = id;
      this.getPokemonDetails(id);
    });
  }

  getPokemonDetails(id: string): void {
    this.backend.getPokemonDetail(id).subscribe((pokemon) => {
      this.detailsSubject.next({ pokemon });
    });
  }

  like() {
    this.user.increaseLikes().subscribe((user) => {
      console.log(user);
      this.appContext.setUser(user);
    });
  }

  dislike() {
    this.user.increaseDislikes().subscribe((user) => {
      this.appContext.setUser(user);
    });
  }

  nextId() {
    console.log(Number(this.id) + 1);
    this.router.navigate(['/pokemons', Number(this.id) + 1]);
  }

  prevId() {
    this.router.navigate(['/pokemons', Number(this.id) - 1]);
  }
}
