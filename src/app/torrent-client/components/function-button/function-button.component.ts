import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-function-button',
  template: `
    <button mat-icon-button>
      <mat-icon (click)="clicked.emit()">{{iconName}}</mat-icon>
    </button>
  `
})
export class FunctionButtonComponent {
  @Input() iconName;
  @Output() clicked = new EventEmitter();
}
