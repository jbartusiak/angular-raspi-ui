import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromServicesState from '../../services/state/services.reducer';
import { IFeatureRoute } from '../../services/state/services.reducer';
import * as fromServicesSelectors from '../../services/state/service.selectors';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';
import { map } from 'rxjs/operators';

@Injectable()
export class NavbarFacade {

  featureRoutes$: Observable<IFeatureRoute[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromServicesState.State>,
              private loadingService: LoadingService) {
    this.featureRoutes$ = this.store.pipe(
      select(fromServicesSelectors.getFeatureRoutes)
    );
    this.loading$ = this.loadingService.queriesInProgress$.pipe(
      map(value => value > 0)
    );
  }
}
