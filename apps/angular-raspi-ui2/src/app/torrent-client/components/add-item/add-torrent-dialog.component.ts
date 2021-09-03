import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { magnetValidator } from '../../../shared/validators/magnet.validator';
import { nameEnterAnimation } from '../../animations/torrent-client.animations';
import { MagnetParserService } from '../../services/magnet-parser.service';
import { SubSink } from 'subsink';

export interface IAddTorrentDialogData {
  categories: string[];
  directories: string[];
  magnet: string;
  size: string;
  title: string;
}

@Component({
  animations: [
    nameEnterAnimation
  ],
  templateUrl: './add-torrent-dialog.component.html',
  styles: [ `
    .full-width {
      margin: 0;
      width: 100%;
    }
  ` ]
})
export class AddTorrentDialogComponent implements OnInit, OnDestroy {

  categories: string[];
  directories: string[];
  title: FormControl;
  addTorrentForm: FormGroup;
  sub: SubSink;

  private torrentMeta: { [key: string]: string | string[] };

  constructor(@Inject(MAT_DIALOG_DATA) public data: IAddTorrentDialogData,
              public dialogRef: MatDialogRef<AddTorrentDialogComponent>,
              private magnetParser: MagnetParserService) {
    this.sub = new SubSink();
  }

  ngOnInit(): void {
    const {categories, directories, magnet, size, title} = this.data;
    this.directories = directories;
    this.categories = categories;
    if (magnet || size || title) {
      this.title = new FormControl({value: title, disabled: !!title});
      this.addTorrentForm = new FormGroup(
        {
          category: new FormControl('', Validators.required),
          directory: new FormControl('', Validators.required),
          magnet: new FormControl({value: magnet, disabled: !!magnet}),
          size: new FormControl({value: size, disabled: !!size}),
          title: this.title,
          autostart: new FormControl(true, Validators.required),
        }
      );
    } else {
      this.title = new FormControl({value: '', disabled: true});
      this.addTorrentForm = new FormGroup(
        {
          category: new FormControl('', Validators.required),
          directory: new FormControl('', Validators.required),
          magnet: new FormControl('', [ Validators.required, magnetValidator ]),
          title: this.title,
          autostart: new FormControl(true, Validators.required),
        }
      );
    }

    this.sub.sink = this.addTorrentForm.controls.magnet.valueChanges.subscribe(
      next => this.parseMagnet(next)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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

  private parseMagnet(magnet: string) {
    if (this.addTorrentForm.controls.magnet.valid) {
      this.torrentMeta = this.magnetParser.parseMagnet(magnet);
      this.title.setValue(this.torrentMeta.dn);
    }
  }
}
