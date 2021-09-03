import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const resultsFadeInAnimation = trigger('resultsFadeIn', [
  transition('* <=> *', [
    query(':enter, :leave',
      style({ position: 'relative' }), { optional: true }
    ),
    group([
      query(':enter', [
        style({
          opacity: 0,
        }),
        animate('1s ease-in',
          style({
            opacity: 1,
          }),
        )
      ], {optional: true}),
    ])
  ])
]);
