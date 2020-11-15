import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromService from '../state/services.reducer';
import { IService } from '../state/services.reducer';
import { select, Store } from '@ngrx/store';
import * as servicesSelectors from '../state/service.selectors';
import { take } from 'rxjs/operators';
import * as servicesActions from '../state/services.actions';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root',
})
export class ServicesFacade {
  services$: Observable<IService[]>;
  server$: Observable<IService>;

  constructor(private store: Store<fromService.State>, private actions$: Actions) {
    this.server$ = this.store.pipe(
      select(servicesSelectors.getServerService)
    );
    this.services$ = this.store.pipe(
      select(servicesSelectors.getServices)
    );
    this.handleOnLoad();
  }

  handleOnLoad() {
    this.store.pipe(
      select(servicesSelectors.getServerService),
      take(1),
    ).subscribe(
      server => this.store.dispatch(servicesActions.getServerStatus({server}))
    );

    this.actions$.pipe(
      ofType(servicesActions.loadServicesSuccess),
      take(1)
    ).subscribe(
      ({services}) => {
        services.forEach(service => this.store.dispatch(servicesActions.getServiceStatus({service})));
      }
    );
  }
}
