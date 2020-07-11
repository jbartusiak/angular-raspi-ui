import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddTorrentDialogComponent } from "../../components/add-item/add-torrent-dialog.component";

@Component({
  selector: 'app-add-item-container',
  template: `
    <app-add-item-component (showModal)="handleShowModal()"></app-add-item-component>`
})
export class AddItemContainer {

  constructor(private dialog: MatDialog) {
  }

  handleShowModal() {
    this.dialog.open(AddTorrentDialogComponent);
    console.log('FAB clicked')
  }
}
