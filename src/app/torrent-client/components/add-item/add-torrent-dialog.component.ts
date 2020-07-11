import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface IAddTorrentDialogData {
  categories: string[];
  directories: string[];
  magnet: string;
  size: string;
  title: string;
}

@Component({
  templateUrl: './add-torrent-dialog.component.html',
  styles: [`
    .full-width {
      margin: 0;
      width: 100%;
    }
  `]
})
export class AddTorrentDialogComponent implements OnInit {

  categories: string[];
  directories: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: IAddTorrentDialogData) {
    console.log(data);
  }

  ngOnInit(): void {
    const {categories, directories} = this.data;
    this.categories = categories;
    this.directories = directories;
  }

}
