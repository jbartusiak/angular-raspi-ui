import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-providers-component',
  templateUrl: './providers.component.html',
  styleUrls: [ './providers.component.scss' ]
})
export class ProvidersComponent implements OnInit {

  checkboxes = [
    {
      checked: false,
      label: 'test',
    },
    {
      checked: false,
      label: 'test',
    },
    {
      checked: false,
      label: 'test',
    },
    {
      checked: false,
      label: 'test',
    },
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
