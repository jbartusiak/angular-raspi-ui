import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ITorrentItem } from "../../state/torrent-client.reducer";
import { SelectionEvent } from "../../events/SelectionEvent";

const getTorrentIcon = (input: string) => {
  const name = input.toLocaleLowerCase();

  if (name.indexOf('games')>=0) return 'games';
  else if (name.indexOf('movies') >= 0) return 'movie';
  else if (name.indexOf('series') >= 0) return 'tv';
  else if (name.indexOf('others') >= 0) return 'description';
  else return 'folder';
}

@Component({
  selector: 'app-torrent-item',
  template: `
    <mat-list-item>
      <button mat-list-avatar mat-icon-button
              [color]="isSelected ? 'primary' : null"
              (click)="handleSelected()">
        <mat-icon>{{ getIcon() }}</mat-icon>
      </button>
      <h1 mat-line>{{ torrent.name }}</h1>
      <span mat-line>
        <mat-progress-bar mode="determinate" color="primary" [value]="torrent.percentDone * 100"></mat-progress-bar>
      </span>
      <sub mat-line>
        <span>{{torrent.percentDone*100}}</span>
      </sub>
      <div style="margin-left: 16px">
        <button mat-icon-button><mat-icon>folder</mat-icon></button>
      </div>
    </mat-list-item>
  `
})
export class TorrentItemComponent {
  @Input() torrent: ITorrentItem;
  @Input() isSelected: boolean;
  @Output() onSelection = new EventEmitter<SelectionEvent>();

  getIcon() {
    return getTorrentIcon(this.torrent.downloadDir);
  }

  handleSelected() {
    this.onSelection.emit({
      torrentId: this.torrent.id,
      selected: !this.isSelected,
    });
  }
}
