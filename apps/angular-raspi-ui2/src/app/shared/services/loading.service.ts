import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { TorrentSearchActionTypes } from '../../torrent-search/state';
import { TorrentClientActionTypes } from '../../torrent-client/state/torrent-client.actions';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private queriesInProgress = 0;
  private queriesInProgressSubject$: Subject<number>;

  private actionsSubscription: Subscription;

  constructor(private actions$: Actions) {
    this.queriesInProgressSubject$ = new Subject<number>();
    this.publishNewValue();
    this.initializeActionObserver();
  }

  get queriesInProgress$(): Observable<number> {
    return this.queriesInProgressSubject$.asObservable();
  }

  beginCall = () => {
    this.queriesInProgress += 1;
    this.publishNewValue();
  };

  endApiCall = () => {
    this.queriesInProgress -= 1;
    this.publishNewValue();
  };

  private publishNewValue() {
    this.queriesInProgressSubject$.next(this.queriesInProgress);
  }

  private initializeActionObserver() {
    this.actionsSubscription = this.actions$.subscribe(action => {
      if (
        action.type.toLocaleLowerCase().includes('success') ||
        action.type.toLocaleLowerCase().includes('fail')
      ) {
        this.endApiCall();
      } else if (
        action.type !== TorrentSearchActionTypes.UpdateQuery &&
        action.type !== TorrentSearchActionTypes.UpdateCategory &&
        action.type !== TorrentClientActionTypes.AddTorrent &&
        action.type !== TorrentClientActionTypes.ClearTorrent &&
        !action.type.toString().includes('router-store')
      ){
        this.beginCall();
      }
    });
  }
}
