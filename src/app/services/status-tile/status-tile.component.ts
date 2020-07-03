import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-tile',
  template: `
    <mat-card class="Card">
      <mat-card-header>
        <div mat-card-avatar><app-blinker></app-blinker></div>
        <mat-card-title>Item title</mat-card-title>
        <mat-card-subtitle>Subtitle</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>Serves configuration and applies actions</p>
      </mat-card-content>
      <mat-card-actions class="button-row" *ngIf="showActions">
        <button mat-flat-button color="accent">Start</button>
        <button mat-flat-button color="primary">Stop</button>
        <button mat-flat-button color="primary">Restart</button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: [ './status-tile.component.scss' ]
})
export class StatusTileComponent implements OnInit {

  @Input() showActions: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
