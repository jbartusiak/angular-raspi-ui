import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as productActions from './services.actions';
import { ConfigurationService } from '../service/configuration.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceEffects {
  constructor(private $actions: Actions,
              private configurationService: ConfigurationService) {
  }

  @Effect()
  fetchConfiguration$ = this.$actions.pipe(
    ofType(productActions.ServiceActionTypes.FetchConfiguration),
    mergeMap(() => this.configurationService.$fetchConfiguration().pipe(
      map(result => console.log(result))
    ))
  );
}
