import { ActionReducerMap } from '@ngrx/store';
import * as fromLessons from '../lessons/store/lessons.reducer';

export interface AppState {
  lessons: fromLessons.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  lessons: fromLessons.LessonsReducer,
};
