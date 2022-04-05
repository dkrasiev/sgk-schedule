import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export function fadeInOut(timing: number) {
  return trigger('fadeInOut', [
    state('void', style({ opacity: 0, transform: 'scale(1.2)' })),
    transition('void => *', animate(timing)),
  ]);
}

export const fadeInOut100ms = fadeInOut(100);
export const fadeInOut300ms = fadeInOut(300);
