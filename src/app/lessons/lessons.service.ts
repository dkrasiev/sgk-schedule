import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { Group } from './group.model';
import { Lesson } from './lesson.model';

@Injectable({ providedIn: 'root' })
export class LessonsService {
  lessons: Subject<Lesson[]> = new Subject<Lesson[]>();
  date: Subject<Date> = new Subject<Date>();
  schedule: Subject<{ date: Date; lessons: Lesson[] }> = new Subject<{
    date: Date;
    lessons: Lesson[];
  }>();
  error: Subject<string> = new Subject<string>();

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
        .get<{ date: Date; lessons: Lesson[] }>(
          'https://asu.samgk.ru//api/schedule/' + group.id + '/' + localISOTime
        )
        .pipe(
          map((response) => {
            response.lessons.map((lesson) => {
              lesson.num = this._numToTime(lesson.num);
              return lesson;
            });

            return response;
          })
        )
        .subscribe({
          next: (v) => {
            if (v && v.lessons) {
              if (v.lessons.length > 0) {
                this.error.next(null);

                v.date = new Date(localISOTime);
                localStorage.setItem('lastGroup', group.name);
                localStorage.setItem('schedule', JSON.stringify(v));
                this.schedule.next(v);
                this.lessons.next(v.lessons);
                this.date.next(v.date);
              } else {
                this.error.next('Расписания нет');
              }
            } else {
              this.error.next('Расписания нет');
            }
          },
          error: (e) => this.error.next(e),
        });
    } else {
      this.error.next('Группа не найдена');
    }
  }

  fetchGroups(): Observable<Group[]> {
    this._numToTime('1');

    return this.http
      .get<Group[]>('https://mfc.samgk.ru/api/groups')
      .pipe(tap((groups) => (this.groups = groups)));
  }

  private _numToTime(num: number | string): string {
    num = num.toString();
    const times = {
      '1': ' 08:25\n10:00',
      '2': ' 10:10\n11:45',
      '3': ' 12:15\n13:50',
      '4': ' 14:00\n15:35',
      '5': ' 15:45\n17:20',
      '6': ' 17:30\n19:05',
      '7': ' 19:15\n20:50',
      '1.1': ' 08:25\n09:10',
      '1.2': ' 09:15\n10:00',
      '2.1': ' 10:10\n10:55',
      '2.2': ' 11:00\n11:45',
      '3.1': '12:15\n13:00',
      '3.2': '13:05\n13:50',
      '4.1': '14:00\n14:45',
      '4.2': '14:50\n15:35',
      '5.1': '15:45\n16:30',
      '5.2': '16:35\n17:20',
      '6.1': '17:30\n18:15',
      '6.2': '18:20\n19:05',
      '7.1': '19:15\n20:00',
      '7.2': '20:05\n20:50',
    };
    return times[num];
  }
}
