import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as fromService from "../state/services.reducer";
import { IService } from "../state/services.reducer";
import { select, Store } from "@ngrx/store";
import * as servicesSelectors from "../state/service.selectors";
import { take } from "rxjs/operators";
import * as servicesActions from "../state/services.actions";

@Injectable({
  providedIn: 'root',
})
export class ServicesFacade {
  services$: Observable<IService[]>;
  server$: Observable<IService>;

  constructor(private store: Store<fromService.State>) {
    this.server$ = this.store.pipe(
      select(servicesSelectors.getServerService)
    );
    this.services$ = this.store.pipe(
      select(servicesSelectors.getServices)
    );
    this.store.pipe(
      select(servicesSelectors.getServerService),
      take(1),
    ).subscribe(
      server => this.store.dispatch(servicesActions.getServerStatus({server}))
    );
  }
}
