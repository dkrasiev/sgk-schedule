import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Schedule } from '../schedule.model';
import * as LessonsActions from '../store/lessons.actions';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css'],
  animations: [
    trigger('dataChanged', [
      // state('changed', style({ opacity: 0, transform: 'scale(1.1)' })),
      transition('* => *', [
        style({ opacity: 0, transform: 'scale(1.1)' }),
        animate(100),
      ]),
    ]),
  ],
})
export class LessonsListComponent implements OnInit, OnDestroy {
  schedule: Schedule;
  error: string;
  state: number;

  storeSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    const schedule = JSON.parse(localStorage.getItem('schedule'));
    if (schedule && schedule?.date && schedule?.lessons) {
      this.schedule = schedule;
      this.error = null;
    }

    this.storeSub = this.store.select('lessons').subscribe((lessonsState) => {
      this.schedule = lessonsState.loadedSchedule;
      this.error = lessonsState.errorMessage;
    });

    this.actions$
      .pipe(ofType(LessonsActions.SET_SCHEDULE, LessonsActions.SET_ERROR))
      .subscribe(() => {
        this.state = Math.random();
      });
  }

  ngOnDestroy(): void {
    if (this.storeSub) this.storeSub.unsubscribe();
  }
}
