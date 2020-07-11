import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: IAddTorrentDialogData,
              public dialogRef: MatDialogRef<AddTorrentDialogComponent>) {
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
          magnet: new FormControl({value: magnet, disabled: !!magnet}),
          size: new FormControl({value: size, disabled: !!size}),
          title: new FormControl({value: title, disabled: !!title}),
          autostart: new FormControl(true, Validators.required),
        }
      )
    }
    else {
      this.addTorrentForm = new FormGroup(
        {
          category: new FormControl('', Validators.required),
          directory: new FormControl('', Validators.required),
          magnet: new FormControl('', [Validators.required, magnetValidator]),
          autostart: new FormControl(true, Validators.required),
        }
      )
    }
  }

  submitDialog() {
    console.log('Dialog submitted!');
    this.dialogRef.close({
      autostart: this.addTorrentForm.controls.autostart.value,
      category: this.addTorrentForm.controls.category.value,
      directory: this.addTorrentForm.controls.directory.value,
      magnet: this.addTorrentForm.controls.magnet.value,
    });
  }
}
