import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Schedule } from '../schedule.model';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css'],
  animations: [
    trigger('in', [
      transition('void => *', [style({ opacity: 0 }), animate(300)]),
      transition('* => void', [
        style({ position: 'absolute' }),
        animate(0, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LessonsListComponent implements OnInit, OnDestroy {
  schedule: Schedule;
  error: string;

  storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    const schedule = JSON.parse(localStorage.getItem('schedule'));
    if (schedule && schedule?.date && schedule?.lessons) {
      this.schedule = schedule;
    }

    this.storeSub = this.store.select('lessons').subscribe((lessonsState) => {
      this.schedule = lessonsState.loadedSchedule;
      this.error = lessonsState.errorMessage;
    });
  }

  ngOnDestroy(): void {
    if (this.storeSub) this.storeSub.unsubscribe();
  }
}
