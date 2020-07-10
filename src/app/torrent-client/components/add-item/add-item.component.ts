import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-add-item-component',
  template: `
    <button class="Fab" mat-fab color="primary" (click)="showModal.emit()"><mat-icon>add</mat-icon></button>
  `,
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent {
  @Output() showModal = new EventEmitter();
}
