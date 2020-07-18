import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _queriesInProgress: number = 0;
  private _queriesInProgress$: Subject<number>;

  constructor() {
    this._queriesInProgress$ = new Subject<number>();
    this.publishNewValue();
  }

  get queriesInProgress$(): Observable<number> {
    return this._queriesInProgress$.asObservable();
  }

  beginCall = () => {
    this._queriesInProgress += 1;
    this.publishNewValue();
  }

  endApiCall = () => {
    this._queriesInProgress -= 1;
    this.publishNewValue();
  }

  private publishNewValue() {
    this._queriesInProgress$.next(this._queriesInProgress);
  }
}
