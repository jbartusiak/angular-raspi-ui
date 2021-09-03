import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromService from './state/services.reducer';
import { IService } from './state/services.reducer';
import * as servicesActions from './state/services.actions';
import { ServicesFacade } from './service/services.facade';

@Component({
  templateUrl: './services.component.html',
  styleUrls: [ './services.component.scss' ]
})
export class ServicesComponent {
  server$: Observable<IService>;
  services$: Observable<IService[]>;

  constructor(private store: Store<fromService.State>,
              private facade: ServicesFacade) {
    this.server$ = facade.server$;
    this.services$ = facade.services$;

    this.store.dispatch(servicesActions.loadServices());
  }
}
