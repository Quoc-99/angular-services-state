import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { DetailsService } from './details.service';

@Component({
  selector: 'pokemon-details',
  template: `
    <ng-container *ngIf="(state$ | async) as state">
      <div class="flex gap-4 items-center justify-center">
        <button (click)="prevId()">
          <<
        </button>
        <pokemon-card [pokemon]="state.pokemon"></pokemon-card>
        <button (click)="nextId()">
          >>
        </button>
      </div>

      <div class="flex w-1/3 px-4 justify-between items-center">
        <button
          class="border border-gray-600 px-4 py-2 rounded"
          (click)="like()"
        >
          Like
        </button>
        <button
          class="border border-gray-600 px-4 py-2 rounded"
          (click)="dislike()"
        >
          Dislike
        </button>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        height: calc(100% - 5rem);
      }
    `
  ],
  providers: [DetailsService]
})
export class DetailsComponent {
  @HostBinding('class') hostClass =
    'flex flex-col gap-4 items-center justify-center';

  state$ = this.details.state$;

  constructor(private details: DetailsService) {}

  nextId() {
    this.details.nextId();
  }

  prevId() {
    this.details.prevId();
  }

  like() {
    this.details.like();
  }

  dislike() {
    this.details.dislike();
  }
}
