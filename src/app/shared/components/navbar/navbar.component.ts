import { Component, Input } from '@angular/core';
import { NavbarItem } from './navbar.types';

@Component({
  selector: 'navbar-component',
  template: `
    <mat-toolbar class="Toolbar" color="primary">
      <mat-toolbar-row>
        <button
          mat-icon-button
          class="example-icon"
          aria-label="Example icon-button with menu icon"
          (click)="panelOpened = !panelOpened"
        >
          <mat-icon>menu</mat-icon>
        </button>
        <span>{{name}}</span>
        <span style="flex: 1 1 auto;"></span>
        <mat-slide-toggle (click)="swapTheme()" color="accent">
          <mat-icon>brightness_high</mat-icon>
        </mat-slide-toggle>
      </mat-toolbar-row>
      <mat-toolbar-row
        class="Navbar"
        [class.Hidden]="!panelOpened"
        [class.Show]="panelOpened"
      >
        <div *ngFor="let item of items">
        <button
          mat-button
          [routerLink]="item.link"
          [disabled]="item.disabled"
        >
          {{ item.label }}</button>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() items: NavbarItem[];
  name = 'Raspberry PI';
  panelOpened = false;

  swapTheme(): void {
    window.document.body.classList.toggle('theme-dark');
  }
}
