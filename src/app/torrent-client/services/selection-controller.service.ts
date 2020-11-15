import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectionControllerService {
  private readonly selections: Set<number>;
  private readonly _selections$: Subject<Set<number>>;

  constructor() {
    this.selections = new Set<number>();
    this._selections$ = new Subject<Set<number>>();
    this._selections$.next(this.selections);
  }

  get selections$(): Observable<Set<number>> {
    return this._selections$;
  }

  get snapshot(): number[] {
    return [...this.selections];
  }

  clear() {
    this.selections.clear();
    this.publish();
  }

  select(id: number) {
    this.selections.add(id);
    this.publish();
  }

  deselect(id: number) {
    this.selections.delete(id);
    this.publish();
  }

  isSelected(id: number) {
    return this.selections.has(id);
  }

  private publish() {
    this._selections$.next(this.selections);
  }
}
