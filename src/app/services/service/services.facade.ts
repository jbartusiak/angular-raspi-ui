import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as fromService from "../state/services.reducer";
import { IService } from "../state/services.reducer";
import { select, Store } from "@ngrx/store";
import * as servicesSelectors from "../state/service.selectors";

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
      select(servicesSelectors.getServices),
    );
  }
}
