import { Component, Input } from '@angular/core';
import { IService } from '../../state/services.reducer';

@Component({
  selector: 'app-status-tile',
  templateUrl: './status-tile.component.html',
  styleUrls: [ './status-tile.component.scss' ]
})
export class StatusTileComponent {
  @Input() showActions: boolean;
  @Input() service: IService;
  @Input() icon: string;
}
