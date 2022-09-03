import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, take } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducer';
import { Group } from 'src/app/types/group.model';
import { Schedule } from 'src/app/types/schedule.model';
import * as LessonsActions from './lessons.actions';

@Injectable()
export class LessonsEffects {
  fetchLessons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LessonsActions.FETCH_SCHEDULE),
      switchMap(() => {
        return this.store.select('lessons').pipe(take(1));
      }),
      switchMap((lessonsState) => {
        const group = lessonsState.groups.find(
          (group) => group.id == lessonsState.selectedGroupId
        );
        const date = lessonsState.selectedDate;

        return this.getScheduleApi(group, date).pipe(
          take(1),
          map((response) => {
            if (response && response.lessons && response.lessons.length > 0) {
              response.date = date;
              response.lessons.map(
                (lesson) => (lesson.num = this._numToTime(lesson.num))
              );
              return new LessonsActions.SetSchedule(response);
            } else {
              return new LessonsActions.SetError('Расписание не найдено');
            }
          }),
          catchError((e) => {
            return of(new LessonsActions.SetError(e.message));
          })
        );
      })
    );
  });

  fetchGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LessonsActions.FETCH_GROUPS),
      switchMap(() => {
        return this.http.get<Group[]>('https://mfc.samgk.ru/api/groups').pipe(
          take(1),
          map((value) => {
            return new LessonsActions.SetGroups(
              value.sort((a, b) => {
                return a.name.localeCompare(b.name);
              })
            );
          }),
          catchError((e) => of(new LessonsActions.SetError(e.message)))
        );
      })
    );
  });

  loadLastData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LessonsActions.LOAD_LAST_DATA),
      map(() => {
        const lastGroupId = +localStorage.getItem('lastGroupId');

        if (lastGroupId) return new LessonsActions.SelectGroupId(lastGroupId);
        else return null;
        // this.store.dispatch(new LessonsActions.SelectGroupId(lastGroupId));
      })
    );
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  private getScheduleApi(group: Group, date: Date) {
    const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(date.getTime() - tzoffset)
      .toISOString()
      .split('T')[0];

    return this.http.get<Schedule>(
      'https://asu.samgk.ru//api/schedule/' + group?.id + '/' + localISOTime
    );
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
