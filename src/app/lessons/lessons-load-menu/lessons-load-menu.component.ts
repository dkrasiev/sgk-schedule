import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs';
import { LessonsService } from 'src/app/lessons/lessons.service';
import { Group } from '../group.model';

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

  constructor(private lessonsService: LessonsService) {}

  ngOnInit(): void {
    const lastGroup = localStorage.getItem('lastGroup');
    if (lastGroup) {
      this.groupName = lastGroup;
    }

    this.lessonsService
      .fetchGroups()
      .pipe(
        take(1),
        map((groups) => groups.sort())
      )
      .subscribe((groups) => {
        this.groups = groups;
        this.filteredGroupsNames = this.groups.map((group) => group.name);
      });
  }

  onLoadSchedule() {
    this.lessonsService.fetchLessons(this.groupName, this.date);
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
