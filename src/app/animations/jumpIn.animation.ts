import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export function fadeInOut(timing: number) {
  return trigger('jumpIn', [
    transition('* => *', [
      style({ opacity: 0, transform: 'scale(1.1)' }),
      animate(timing),
    ]),
  ]);
}

export const jumpIn100ms = fadeInOut(100);
export const jumpIn300ms = fadeInOut(300);
