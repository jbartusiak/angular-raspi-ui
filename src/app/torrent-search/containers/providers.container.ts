import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IOptions, ITorrentProvider, State } from '../state';
import * as actions from '../state/torrent-search.actions';
import { TorrentSearchFacade } from '../service/torrent-search.facade';

@Component({
  template: `
    <app-providers-component
      [providers]="enabledProviders$ | async"
      (onChecked)="updateEnabledProviders($event)"></app-providers-component>
  `,
  selector: 'app-providers-container'
})
export class ProvidersContainer {

  enabledProviders$: Observable<(ITorrentProvider & { enabled: boolean })[]>;

  constructor(private store: Store<State>,
              private facade: TorrentSearchFacade) {
    this.enabledProviders$ = this.facade.enabledProvidersBindable$;
  }

  updateEnabledProviders(change: IOptions) {
    this.store.dispatch(new actions.UpdateEnabledProviders(change));
  }

}
