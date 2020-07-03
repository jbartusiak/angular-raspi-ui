import { Component, Input } from '@angular/core';
import { ServiceStatus } from "../../../services/state/services.reducer";

@Component({
  template: `
    <div class="Blinker"
        [class]="getClass()">
    </div>`,
  selector: 'app-blinker',
  styleUrls: ['./blinker.component.scss']
})
export class BlinkerComponent {
  @Input() status: ServiceStatus;

  getClass() {
    switch (this.status) {
      case ServiceStatus.DOWN: return 'red';
      case ServiceStatus.UNKNOWN: return 'yellow';
      case ServiceStatus.UP: return 'green';
    }
  }
}
