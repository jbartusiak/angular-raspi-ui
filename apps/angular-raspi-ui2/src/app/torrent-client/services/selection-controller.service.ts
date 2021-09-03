import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectionControllerService {
  private readonly selections: Set<number>;
  private readonly selectionsSubject$: Subject<Set<number>>;

  constructor() {
    this.selections = new Set<number>();
    this.selectionsSubject$ = new Subject<Set<number>>();
    this.selectionsSubject$.next(this.selections);
  }

  get selections$(): Observable<Set<number>> {
    return this.selectionsSubject$;
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
    this.selectionsSubject$.next(this.selections);
  }
}
