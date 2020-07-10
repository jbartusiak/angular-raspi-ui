import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  templateUrl: './add-torrent-dialog.component.html',
})
export class AddTorrentDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddTorrentDialogComponent>) {
  }
}
