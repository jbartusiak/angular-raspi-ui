import {Component, Input, OnInit} from '@angular/core';
import { IService } from '../../state/services.reducer';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-status-tile',
  templateUrl: './status-tile.component.html',
  styleUrls: [ './status-tile.component.scss' ]
})
export class StatusTileComponent implements OnInit{
  @Input() showActions: boolean;
  @Input() service: IService;
  @Input() icon: string;
  serviceUrl: SafeUrl;
  serverUrl = environment.serverIp;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.serviceUrl = this.sanitizer.bypassSecurityTrustUrl(`http://${environment.serverIp}:${this.service.port}`);
  }
}
