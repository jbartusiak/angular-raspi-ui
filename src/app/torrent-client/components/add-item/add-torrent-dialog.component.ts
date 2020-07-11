import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { magnetValidator } from "../../../shared/validators/magnet.validator";

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

  addTorrentForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IAddTorrentDialogData) {
    console.log(data);
  }

  ngOnInit(): void {
    const {categories, directories, magnet, size, title} = this.data;
    this.directories = directories;
    this.categories = categories;
    if (magnet || size || title) {
      this.addTorrentForm = new FormGroup(
        {
          category: new FormControl('', Validators.required),
          directory: new FormControl('', Validators.required),
          magnet: new FormControl({value: magnet, disabled: !!magnet}, Validators.required),
          size: new FormControl({value: size, disabled: !!size}, Validators.required),
          title: new FormControl({value: title, disabled: !!title}, Validators.required),
          start: new FormControl(true, Validators.required),
        }
      )
    }
    else {
      this.addTorrentForm = new FormGroup(
        {
          category: new FormControl('', Validators.required),
          directory: new FormControl('', Validators.required),
          magnet: new FormControl('', [Validators.required, magnetValidator]),
          start: new FormControl(true, Validators.required),
        }
      )
    }
  }

}
