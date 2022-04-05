import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fadeInOut100ms } from './animations/fadeInOut.animation';
import { Schedule } from './lessons/schedule.model';
import * as LessonsActions from './lessons/store/lessons.actions';
import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeInOut100ms
  ],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new LessonsActions.FetchGroups());
    const lastGroupName = localStorage.getItem('lastGroup');
    const lastSchedule: Schedule = JSON.parse(
      localStorage.getItem('lastSchedule')
    );

    if (lastGroupName) {
      this.store.dispatch(new LessonsActions.SelectGroupName(lastGroupName));
    }
    if (lastSchedule) {
      this.store.dispatch(new LessonsActions.SetSchedule(lastSchedule));
    }
  }
}
