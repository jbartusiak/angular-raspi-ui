import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-tile',
  template: `
    <mat-card class="Card">
      <mat-card-header>
        <div mat-card-avatar class="Avatar"><img alt="icon" class="Icon" src="{{ icon }}"></div>
        <mat-card-title>{{title}} <app-blinker></app-blinker></mat-card-title>
        <mat-card-subtitle class="Subtitle">
          Service address:
          <a mat-button href="{{ href }}">{{ href }}</a>
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <ng-content></ng-content>
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
  @Input() title: string;
  @Input() href: string;
  @Input() description: string;
  @Input() icon: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
