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
  groupName: string = '';
  date: Date = new Date();

  groups: Group[] = [];
  filteredGroupsNames: string[] = [];
  isLoading: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    const lastGroup = localStorage.getItem('lastGroup');
    if (lastGroup) {
      this.groupName = lastGroup;
      this.filteredGroupsNames = this._filter(this.groupName);
    }

    this.store.select('lessons').subscribe((lessonsState) => {
      this.groups = lessonsState.groups;
      this.isLoading = lessonsState.isLoading;

      this.filteredGroupsNames = this._filter(this.groupName);
    });
  }

  onLoadSchedule() {
    this.store.dispatch(new lessonsActions.SelectGroupName(this.groupName));
    this.store.dispatch(new lessonsActions.SelectDate(this.date));
    this.store.dispatch(new lessonsActions.FetchSchedule());
  }

  onGroupNamesChange(e) {
    this.filteredGroupsNames = this._filter(e);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.groups
      .map((group) => group.name)
      .filter((option) => option.toLowerCase().includes(filterValue));
  }
}
