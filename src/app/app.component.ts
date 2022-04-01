import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('in', [
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(500),
      ]),
    ]),
  ],
})
export class AppComponent {}
