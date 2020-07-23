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
  templateUrl: './torrent-item.component.html',
  styleUrls: [ './torrent-item.component.scss' ],
  animations: [ statusSwitchAnimation ]
})
export class TorrentItemComponent implements OnInit {
  @Input() torrent: ITorrentItem;
  @Input() isSelected: boolean;
  @Input() displayStatus: ETorrentItemStatusDisplay;
  @Output() onSelection = new EventEmitter<SelectionEvent>();
  @Output() onDetails = new EventEmitter();

  percentDone: string;
  size: string;
  status: string;

  ngOnInit(): void {
    this.percentDone = `${ (this.torrent.percentDone * 100).toFixed(2) }%`;
    this.size = this.getSize();
    this.status = ETransmissionTorrentStatus[this.torrent.status];
  }

  getSize() {
    if (this.torrent.totalSize === 0) {
      return 'Size in unknown'
    }
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

  handleSelected(event: MouseEvent) {
    event.stopPropagation();
    this.onSelection.emit({
      torrentId: this.torrent.id,
      selected: !this.isSelected,
    });
  }

  handleDetails() {
    this.onDetails.emit(this.torrent.id);
  }
}
