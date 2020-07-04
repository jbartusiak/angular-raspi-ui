import { Component, Input } from '@angular/core';
import { ServiceStatus } from "../../../services/state/services.reducer";

@Component({
  template: `
    <div class="Blinker"
         [ngClass]="{'green': status.valueOf() === 0, 'red': status.valueOf()===1, 'yellow': status.valueOf()===2}"
    >
    </div>`,
  selector: 'app-blinker',
  styleUrls: [ './blinker.component.scss' ],
})
export class BlinkerComponent {
  @Input() status: ServiceStatus;
}
