import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import {
  SelectDate,
  SelectGroupId,
  FetchSchedule,
} from 'src/app/store/lessons/lessons.actions';
import { Group } from 'src/app/types/group.model';

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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select('lessons')
      .subscribe(({ groups, isLoading, selectedGroupId }) => {
        this.groups = groups;
        this.isLoading = isLoading;
        this.selectedGroupId = selectedGroupId;
      });

    this.store.dispatch(new SelectDate(this.selectedDate));
  }

  LoadSchedule() {
    if (!this.selectedGroupId || !this.selectedDate) {
      return;
    }

    localStorage.setItem('lastGroupId', this.selectedGroupId.toString());
    this.store.dispatch(new SelectGroupId(this.selectedGroupId));
    this.store.dispatch(new SelectDate(this.selectedDate));
    this.store.dispatch(new FetchSchedule());
  }
}
