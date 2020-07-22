import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ITorrentItem } from "../../state/torrent-client.reducer";
import { SelectionEvent } from "../../events/SelectionEvent";
import { ETorrentItemStatusDisplay } from '../../models/TorrentItemStatusDisplay';
import { statusSwitchAnimation } from "../../animations/torrent-client.animations";

const getTorrentIcon = (input: string) => {
  const name = input.toLocaleLowerCase();

  if (name.indexOf('games') >= 0) return 'games';
  else if (name.indexOf('movies') >= 0) return 'movie';
  else if (name.indexOf('series') >= 0) return 'tv';
  else if (name.indexOf('others') >= 0) return 'description';
  else return 'folder';
}

const megabyte = 1048576;
const gigabyte = 1073741824;

const sizeConverter = (bytes: number) => {
  if (bytes > gigabyte) {
    return `${ (bytes / gigabyte).toFixed(2) } GB`;
  } else {
    return `${ (bytes / megabyte).toFixed(2) } MB`;
  }
}

enum ETransmissionTorrentStatus {
  Stopped, // Torrent is stopped
  'Pending filecheck', // Queued to check files
  'Checking files', // Checking files
  'Pending download', // Queued for download
  Downloading, // Downloading
  'Pending seed', // Queued to seed
  Seeding, // Seeding
  'No peers found' // No peers found
}


@Component({
  selector: 'app-torrent-item',
  template: `
    <mat-list-item class="mat-elevation-z3">
      <button mat-list-avatar mat-icon-button
              class="ToggleButton"
              [class.Downloading]="[1,2,3,4].indexOf(torrent.status)!==-1"
              [class.Seeding]="[5,6].indexOf(torrent.status)!==-1"
              [color]="isSelected ? 'primary' : null"
              (click)="handleSelected()">
        <mat-icon>{{ getIcon() }}</mat-icon>
      </button>
      <h1 mat-line>{{ torrent.name }}</h1>
      <span mat-line>
        <mat-progress-bar mode="determinate" color="primary" [value]="torrent.percentDone * 100"></mat-progress-bar>
      </span>
      <div mat-line>
        <div *ngIf="displayStatus===2" @statusSwitch>
          Seeds: {{torrent.peersSendingToUs}} Seeds available: {{torrent.peersConnected}}
        </div>
        <div *ngIf="displayStatus===1" @statusSwitch>{{percentDone}} ({{ size }})</div>
        <div *ngIf="displayStatus===0" @statusSwitch>{{status}} </div>
      </div>
    </mat-list-item>
  `,
  styleUrls: [ './torrent-item.component.scss' ],
  animations: [ statusSwitchAnimation ]
})
export class TorrentItemComponent implements OnInit {
  @Input() torrent: ITorrentItem;
  @Input() isSelected: boolean;
  @Input() displayStatus: ETorrentItemStatusDisplay;
  @Output() onSelection = new EventEmitter<SelectionEvent>();

  percentDone: string;
  size: string;
  status: string;

  ngOnInit(): void {
    this.percentDone = `${ (this.torrent.percentDone * 100).toFixed(2) }%`;
    this.size = this.getSize();
    this.status = ETransmissionTorrentStatus[this.torrent.status];
  }

  getSize() {
    if (this.torrent.percentDone === 1) {
      return `${ sizeConverter(this.torrent.totalSize) }`;
    } else {
      return `${ sizeConverter(this.torrent.downloadedEver) } of ${ sizeConverter(this.torrent.totalSize) }`;
    }
  }

  getIcon() {
    if ([ 1, 2, 3, 4 ].indexOf(this.torrent.status) !== -1) {
      return 'get_app';
    } else if ([ 5, 6 ].indexOf(this.torrent.status) !== -1) {
      return 'publish';
    }
    return getTorrentIcon(this.torrent.downloadDir);
  }

  handleSelected() {
    this.onSelection.emit({
      torrentId: this.torrent.id,
      selected: !this.isSelected,
    });
  }
}
