import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

export interface IDeleteTorrentDialogData {
  names: string[];
}

@Component({
  templateUrl: './delete-torrent-dialog.component.html',
  styleUrls: ['./delete-torrent-dialog.component.scss']
})
export class DeleteTorrentDialogComponent {

  deleteData = new FormControl(false);

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDeleteTorrentDialogData,
              public dialogRef: MatDialogRef<DeleteTorrentDialogComponent>) {
  }

  submitDialog() {
    this.dialogRef.close({
      deleteLocalData: this.deleteData.value,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
