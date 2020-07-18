import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as servicesActions from './services.actions';
import { GetServiceStatus } from './services.actions';
import { ConfigurationService } from '../service/configuration.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from "rxjs";
import { LoadingService } from "../../shared/services/loading.service";

@Injectable({
  providedIn: 'root'
})
export class ServiceEffects {
  constructor(private $actions: Actions,
              private configurationService: ConfigurationService,
              private loading: LoadingService) {
  }

  @Effect()
  loadServices$ = this.$actions.pipe(
    ofType(servicesActions.ServiceActionTypes.Load),
    tap(this.loading.beginCall),
    mergeMap(() => this.configurationService.$fetchConfiguration().pipe(
      tap(this.loading.endApiCall),
      map(result => new servicesActions.LoadSuccess(result)),
      catchError(err => of(new servicesActions.LoadFail(err))),
    ))
  );

  @Effect()
  getServiceStatus$ = this.$actions.pipe(
    ofType<GetServiceStatus>(servicesActions.ServiceActionTypes.GetServiceStatus),
    tap(this.loading.beginCall),
    mergeMap(action => this.configurationService.$getServiceStatus(action.payload).pipe(
      tap(this.loading.endApiCall),
      map(result => new servicesActions.GetServiceStatusSuccess({
        service: action.payload,
        status: result,
      }))
    ))
  )
}
