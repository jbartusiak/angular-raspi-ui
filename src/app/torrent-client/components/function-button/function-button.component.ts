import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-function-button',
  template: `
    <button class="Button" mat-flat-button [disabled]="disabled" color="{{ color }}" (click)="clicked.emit()">
      <mat-icon>{{iconName}}</mat-icon>
      <span *ngIf="label" class="Label">{{label}}</span>
    </button>
  `,
  styles: [`
    .Button {
      width:100%;
    }
    .Label {
      margin-left: 8px  ;
    }
  `]
})
export class FunctionButtonComponent {
  @Input() iconName: string;
  @Input() label: string;
  @Input() color: 'accent' | 'primary' | 'warn' | null;
  @Input() disabled: boolean;
  @Output() clicked = new EventEmitter();
}
