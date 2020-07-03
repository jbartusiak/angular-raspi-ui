import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  template: `
    <div class="Backdrop">
      <ng-content select="[backdrop-content]"></ng-content>
      <div class="Backdrop-Content mat-elevation-z10">
        <ng-content select="[backdrop-front]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
