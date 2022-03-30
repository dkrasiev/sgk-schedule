import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Group } from './group.model';
import { Lesson } from './lesson.model';

@Injectable({ providedIn: 'root' })
export class LessonsService {
  lessons: Subject<Lesson[]> = new Subject<Lesson[]>();
  groups: Group[] = [];

  constructor(private http: HttpClient) {}

  fetchLessons(groupName: string, date: Date) {
    const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(date.getTime() - tzoffset)
      .toISOString()
      .split('T')[0];

    const group = this.groups.find(
      (group) => group.name.toLowerCase() == groupName.toLowerCase()
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

  fetchGroups(): Observable<Group[]> {
    return this.http
      .get<Group[]>('https://mfc.samgk.ru/api/groups')
      .pipe(tap((groups) => (this.groups = groups)));
  }
}
