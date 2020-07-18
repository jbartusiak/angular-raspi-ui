import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as servicesActions from './services.actions';
import { GetServiceStatus } from './services.actions';
import { ConfigurationService } from '../service/configuration.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceEffects {
  constructor(private $actions: Actions,
              private configurationService: ConfigurationService) {
  }

  @Effect()
  loadServices$ = this.$actions.pipe(
    ofType(servicesActions.ServiceActionTypes.Load),
    mergeMap(() => this.configurationService.$fetchConfiguration().pipe(
      map(result => new servicesActions.LoadSuccess(result)),
      catchError(err => of(new servicesActions.LoadFail(err))),
    ))
  );

  @Effect()
  getServiceStatus$ = this.$actions.pipe(
    ofType<GetServiceStatus>(servicesActions.ServiceActionTypes.GetServiceStatus),
    mergeMap(action => this.configurationService.$getServiceStatus(action.payload).pipe(
      map(result => new servicesActions.GetServiceStatusSuccess({
        service: action.payload,
        status: result,
      }))
    ))
  )
}
