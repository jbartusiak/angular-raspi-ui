import { Component, Input, OnInit } from '@angular/core';
import { IService, ServiceStatus } from "../../state/services.reducer";
import { Store } from "@ngrx/store";
import * as actions from './../../state/services.actions';

@Component({
  selector: 'app-status-tile',
  template: `
    <mat-card class="Card">
      <mat-card-header>
        <div mat-card-avatar class="Avatar"><img alt="icon" class="Icon" src="{{ icon? icon : service.icon }}"></div>
        <mat-card-title>{{service.name}}
          <app-blinker [status]="service.actuator.status"></app-blinker>
        </mat-card-title>
        <mat-card-subtitle class="Subtitle">
          Service address:
          <a mat-button href="{{ service.uri }}">{{ service.uri }}</a>
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
  @Input() service: IService;
  @Input() icon: string;

  constructor(private store: Store<ServiceStatus>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new actions.GetServiceStatus(this.service));
  }

}
