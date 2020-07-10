import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-torrent-item',
  template: `
    <mat-list-item>
      <button mat-list-avatar mat-icon-button><mat-icon>folder</mat-icon></button>
      <h1 mat-line>Test</h1>
      <span mat-line>
        <mat-progress-bar mode="determinate" color="primary"></mat-progress-bar>
      </span>
      <sub mat-line>
        <span>Lorem ipsum</span>
      </sub>
      <div style="margin-left: 16px">
        <button mat-icon-button><mat-icon>folder</mat-icon></button>
      </div>
    </mat-list-item>
  `
})
export class TorrentItemComponent {
  @Input() title: string;
}
