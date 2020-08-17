import { Component, Input, OnInit } from '@angular/core';
import { IService, IServicesState, ServiceStatus } from "../../state/services.reducer";
import { Store } from "@ngrx/store";
import { getServiceStatus } from "../../state/services.actions";

@Component({
  selector: 'app-status-tile',
  templateUrl: './status-tile.component.html',
  styleUrls: [ './status-tile.component.scss' ]
})
export class StatusTileComponent implements OnInit {

  @Input() showActions: boolean;
  @Input() service: IService;
  @Input() icon: string;

  constructor(private store: Store<IServicesState>) {
  }

  ngOnInit(): void {
    if (this.service.actuator.status === ServiceStatus.UNKNOWN) {
      this.store.dispatch(getServiceStatus({service: this.service}));
    }
  }

}
