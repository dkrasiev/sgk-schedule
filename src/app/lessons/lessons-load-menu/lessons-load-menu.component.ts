import { Component, OnInit } from '@angular/core';
import { LessonsService } from 'src/app/lessons/lessons.service';

@Component({
  selector: 'app-lessons-load-menu',
  templateUrl: './lessons-load-menu.component.html',
  styleUrls: ['./lessons-load-menu.component.css'],
})
export class LessonsLoadMenuComponent implements OnInit {
  groupName: string = '';
  date: Date = new Date();
  groupsNames: string[] = [];
  filteredGroupsNames: string[] = [];

  constructor(private lessonsService: LessonsService) {}

  ngOnInit(): void {
    this.groupsNames = this.lessonsService.groups
      .map((group) => group.name)
      .sort();

    this.filteredGroupsNames = this.groupsNames;
  }

  onLoadSchedule() {
    this.lessonsService.fetchLessons(this.groupName, this.date);
  }

  onGroupNamesChange(e) {
    this.filteredGroupsNames = this._filter(e);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.groupsNames.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
