import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { jumpIn100ms } from 'src/app/animations/jumpIn.animation';
import * as fromApp from '../../store/app.reducer';
import { Schedule } from '../../types/schedule.model';
import * as LessonsActions from 'src/app/store/lessons/lessons.actions';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css'],
  animations: [jumpIn100ms],
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
