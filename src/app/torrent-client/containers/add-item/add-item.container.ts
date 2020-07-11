import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  AddTorrentDialogComponent,
  IAddTorrentDialogData
} from "../../components/add-item/add-torrent-dialog.component";
import { Store } from "@ngrx/store";
import { State } from "../../../services/state/services.reducer";
import * as servicesSelectors from '../../../services/state/service.selectors';
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-add-item-container',
  template: `
    <app-add-item-component (showModal)="handleShowModal()"></app-add-item-component>`
})
export class AddItemContainer implements OnInit, OnDestroy {

  configuration: { categories: string[], directories: string[]};

  private sub: Subscription;

  constructor(private dialog: MatDialog, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.sub = this.store
      .select(servicesSelectors.getServices)
      .pipe(map(result => Object.values(result)))
      .subscribe(
        (services) => {
          const fromState = services.filter(el => el.name === 'Torrent Backend Service').map(el => el.configuration)[0];
          this.configuration = {
            categories: fromState['categories'],
            directories: fromState['directories']
          }
        }
      )
  }

  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }

  handleShowModal() {
    this.dialog
      .open<AddTorrentDialogComponent, IAddTorrentDialogData>(AddTorrentDialogComponent, {
      width: '500px',
      data: {
        ...this.configuration,
        magnet: '',
        size: '',
        title: '',
      }
    });
  }
}
