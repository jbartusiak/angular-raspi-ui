import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as servicesActions from './services.actions';
import { ConfigurationService } from '../service/configuration.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceEffects {

  loadServices$ = createEffect(() => this.actions$.pipe(
    ofType(servicesActions.loadServices),
    mergeMap(() => this.configurationService.fetchConfiguration$().pipe(
      map(services => servicesActions.loadServicesSuccess({services})),
      catchError(err => of(servicesActions.loadServicesFailed({error: err}))),
    ))
  ));


  getServerStatus$ = createEffect(() => this.actions$.pipe(
    ofType(servicesActions.getServerStatus),
    mergeMap(({server}) => this.configurationService.getServiceStatus$(server).pipe(
      map((result) => servicesActions.getServerStatusSuccess({server: result}))
    ))
  ));


  getServiceStatus$ = createEffect(() => this.actions$.pipe(
    ofType(servicesActions.getServiceStatus),
    mergeMap(({service}) => this.configurationService.getServiceStatus$(service).pipe(
      map(result => servicesActions.getServiceStatusSuccess({service: result}))
    ))
  ));

  constructor(private actions$: Actions,
              private configurationService: ConfigurationService) {
  }
}
