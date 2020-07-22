import { animate, style, transition, trigger } from "@angular/animations";

export const statusSwitchAnimation =
  trigger('statusSwitch', [
    transition('void => *', [
        style({transform: 'translateY(50px)', opacity: 0}),
        animate('500ms linear', style({transform: 'translateY(0)', opacity: 1})),
      ]
    ),
    transition('* => void', [
      style({position: 'absolute', transform: 'translateY(0)', opacity: 0.75, maxHeight: '50px'}),
      animate('150ms linear', style({position: 'absolute', transform: 'translateY(-25px)', opacity: 0, maxHeight: 0}))
    ])
  ]);
