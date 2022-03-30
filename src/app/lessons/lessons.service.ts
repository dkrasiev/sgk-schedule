import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Group } from './group.model';
import { Lesson } from './lesson.model';

@Injectable({ providedIn: 'root' })
export class LessonsService {
  lessons: Subject<Lesson[]> = new Subject<Lesson[]>();
  groups: Group[] = [
    new Group(187, 'ИС-19-04'),
    new Group(200, 'ИС-20-01'),
    new Group(201, 'ИС-20-02'),
    new Group(202, 'ИС-20-03'),
    new Group(203, 'ИС-20-04'),
    new Group(204, 'ИС-20-05'),
  ];

  constructor(private http: HttpClient) {}

  fetchLessons(groupName: string, date: Date) {
    const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(date.getTime() - tzoffset)
      .toISOString()
      .split('T')[0];

    const group = this.groups.find(
      (group) => group.name == groupName.toUpperCase()
    );

    if (group) {
      this.http
        .get<{ date: string; lessons: Lesson[] }>(
          'https://asu.samgk.ru//api/schedule/' + group.id + '/' + localISOTime
        )
        .subscribe({
          next: (v) => {
            if (v && v.lessons) this.lessons.next(v.lessons);
          },
          error: (e) => console.log(e),
        });
    } else {
      console.log('Group not found');
    }
  }
}
