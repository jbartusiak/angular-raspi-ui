import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as servicesActions from './services.actions';
import { ConfigurationService } from '../service/configuration.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceEffects {
  constructor(private actions$: Actions,
              private configurationService: ConfigurationService) {
  }

  @Effect()
  loadServices$ = this.actions$.pipe(
    ofType(servicesActions.loadServices),
    mergeMap(() => this.configurationService.fetchConfiguration$().pipe(
      map(result => servicesActions.loadServicesSuccess(result)),
      catchError(err => of(servicesActions.loadServicesFailed({error: err}))),
    ))
  );

  @Effect()
  getServiceStatus$ = this.actions$.pipe(
    ofType(servicesActions.getServiceStatus),
    mergeMap(({service}) => this.configurationService.getServiceStatus$(service).pipe(
      map(result => servicesActions.getServiceStatusSuccess({
        service: service,
        status: result,
      }))
    ))
  )
}
