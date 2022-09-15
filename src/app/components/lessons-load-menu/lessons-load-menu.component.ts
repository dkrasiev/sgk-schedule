import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Group } from 'src/app/types/group.model';
import * as lessonsActions from 'src/app/store/lessons/lessons.actions';
import * as fromApp from 'src/app/store/app.reducer';

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
    this.store
      .select('lessons')
      .subscribe(({ groups, isLoading, selectedGroupId }) => {
        this.groups = groups;
        this.isLoading = isLoading;
        this.selectedGroupId = selectedGroupId;
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
