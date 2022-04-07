import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { Group } from '../group.model';
import * as lessonsActions from '../store/lessons.actions';

@Component({
  selector: 'app-lessons-load-menu',
  templateUrl: './lessons-load-menu.component.html',
  styleUrls: ['./lessons-load-menu.component.css'],
})
export class LessonsLoadMenuComponent implements OnInit {
  selectedGroupId: number;
  selectedDate: Date = new Date();

  groups: Group[] = [];
  isLoading: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('lessons').subscribe((lessonsState) => {
      this.groups = lessonsState.groups;
      this.isLoading = lessonsState.isLoading;
      this.selectedGroupId = lessonsState.selectedGroupId;
    });
  }

  LoadSchedule() {
    if (this.selectedGroupId && this.selectedDate) {
      localStorage.setItem('lastGroupId', this.selectedGroupId.toString());
      this.store.dispatch(
        new lessonsActions.SelectGroupId(this.selectedGroupId)
      );
      this.store.dispatch(new lessonsActions.SelectDate(this.selectedDate));
      this.store.dispatch(new lessonsActions.FetchSchedule());
    }
  }
}
