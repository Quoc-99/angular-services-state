import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import type { PaginatorState } from '../../../components/paginator/paginator.component';
import { ListService } from './list.service';

@Component({
  selector: 'pokemon-list',
  template: `
    <ng-container *ngIf="(state$ | async) as state">
      <paginator
        [currentPage]="state.page"
        [rowsPerPageOptions]="[10, 20, 40, 80]"
        [rows]="state.perPage"
        [totalRecords]="state.totalRows"
        (onPageChange)="onPageChanged($event)"
      ></paginator>
      <input
        type="text"
        class="w-2/4 p-2 rounded border border-gray-600"
        placeholder="Filter by pokemon name..."
        [formControl]="query"
      />
      <data-table [isLoading]="state.isLoading" [data]="state.pokemons"></data-table>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ListService]
})
export class ListComponent implements OnInit {
  query = new FormControl('');
  state$ = this.list.state$;

  constructor(
    private list: ListService
  ) {
    this.query.valueChanges.pipe(debounceTime(500))
      .subscribe(query => this.list.setQuery(query))
  }

  ngOnInit() {
    this.list.setState({});
  }

  onPageChanged({ page, rows, first }: PaginatorState) {
    this.list.setState({ page, perPage: rows, offset: first - rows });
    this.query.setValue('');
  }
}
