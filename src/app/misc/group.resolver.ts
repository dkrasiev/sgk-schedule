import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { Group } from 'src/app/types/group.model';
import * as fromApp from '../store/app.reducer';
import * as LessonsActions from '../store/lessons/lessons.actions';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GroupsResolver implements Resolve<Group[]> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Group[] | Observable<Group[]> | Promise<Group[]> {
    return this.http.get<Group[]>('https://mfc.samgk.ru/api/groups').pipe(
      take(1),
      map((value) => {
        return value.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
      }),
      tap((groups) => {
        this.store.dispatch(new LessonsActions.SetGroups(groups));
        this.store.dispatch(new LessonsActions.FetchSchedule());
      })
    );
  }

  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
