import { animate, group, query, style, transition, trigger, } from '@angular/animations';

export const routerNavigationAnimation = trigger('routerNaviation', [
  transition('* <=> *', [
    query(':enter, :leave',
      style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }
    ),
    group([
      query(':enter', [
        style({
          transform: 'translateY(5%)',
          opacity: 0,
        }),
        animate('0.5s ease-out',
          style({
            transform: 'translateY(0)',
            opacity: 1,
          })
        )
      ], {optional: true}),
      query(':leave', [
        style({
          opacity: 1,
        }),
        animate('0.25s ease-in',
          style({
            opacity: 0,
            transform: 'translateY(-5%)'
          })
        )
      ], {optional: true})
    ])
  ])
]);
