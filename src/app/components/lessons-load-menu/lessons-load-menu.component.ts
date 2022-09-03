import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Group } from 'src/app/types/group.model';
import * as lessonsActions from 'src/app/store/lessons/lessons.actions';

@Component({
  selector: 'app-lessons-load-menu',
  templateUrl: './lessons-load-menu.component.html',
  styleUrls: ['./lessons-load-menu.component.css'],
})
export class LessonsLoadMenuComponent implements OnInit {
  selectedGroupId: number;
  selectedDate: Date = (() => {
    const currentDate = new Date();

    switch (currentDate.getDay()) {
      case 0:
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      case 6:
        currentDate.setDate(currentDate.getDate() + 2);
        break;
    }

    return currentDate;
  })();

  groups: Group[] = [];
  isLoading: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('lessons').subscribe((lessonsState) => {
      this.groups = lessonsState.groups;
      this.isLoading = lessonsState.isLoading;
      this.selectedGroupId = lessonsState.selectedGroupId;
    });

    this.store.dispatch(new lessonsActions.SelectDate(this.selectedDate));
  }

  LoadSchedule() {
    if (!this.selectedGroupId || !this.selectedDate) {
      return;
    }

    localStorage.setItem('lastGroupId', this.selectedGroupId.toString());
    this.store.dispatch(new lessonsActions.SelectGroupId(this.selectedGroupId));
    this.store.dispatch(new lessonsActions.SelectDate(this.selectedDate));
    this.store.dispatch(new lessonsActions.FetchSchedule());
  }
}
