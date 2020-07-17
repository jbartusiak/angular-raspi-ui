import { Component } from '@angular/core';
import { SelectionControllerService } from "../../services/selection-controller.service";
import { State } from "../../state/torrent-client.reducer";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as actions from '../../state/torrent-client.actions';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.container.html',
  styleUrls: [ './tools.container.scss' ]
})
export class ToolsContainer {

  selections$: Subscription;

  constructor(private selectionService: SelectionControllerService,
              private store: Store<State>) {
    this.selections$ = this.selectionService.selections$.subscribe(
      next => console.log('new selection', next)
    );
  }

  handleStart() {
    this.store.dispatch(new actions.StartTorrent(this.selectionService.snapshot));
    this.selectionService.clear();
  }

  handleStop() {
    console.log('stop');
  }

  handleDelete() {
    console.log('delete');
  }

}
