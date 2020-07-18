import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOptions, ITorrentProvider } from "../../state";

/*
* TODO add a functionality that makes search run on provider changed
* */

@Component({
  selector: 'app-providers-component',
  templateUrl: './providers.component.html',
  styleUrls: [ './providers.component.scss' ]
})
export class ProvidersComponent {
  @Input() providers: (ITorrentProvider & {enabled: boolean})[];
  @Output() onChecked = new EventEmitter<IOptions>();

  handleChange(name: string, value: boolean) {
    this.onChecked.emit({
      [name]: value,
    });
  }
}
