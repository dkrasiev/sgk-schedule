import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Group } from '../group.model';
import { Schedule } from '../schedule.model';
import * as LessonsActions from './lessons.actions';

export interface State {
  selectedGroup: string;
  selectedDate: Date;
  loadedSchedule: Schedule;
  groups: Group[];
  errorMessage: string;
  isLoading: boolean;
}

const initialState: State = {
  selectedGroup: '',
  selectedDate: new Date(),
  loadedSchedule: null,
  groups: [],
  errorMessage: null,
  isLoading: false,
};

export function LessonsReducer(
  state: State = initialState,
  action: LessonsActions.ScheduleActions
) {
  switch (action.type) {
    case LessonsActions.FETCH_SCHEDULE:
      return { ...state, isLoading: true };
    case LessonsActions.SET_GROUPS:
      return { ...state, groups: action.payload };
    case LessonsActions.SET_SCHEDULE:
      localStorage.setItem('lastSchedule', JSON.stringify(action.payload));
      return {
        ...state,
        loadedSchedule: action.payload,
        isLoading: false,
        errorMessage: null,
      };
    case LessonsActions.SET_ERROR:
      return {
        ...state,
        loadedSchedule: null,
        isLoading: false,
        errorMessage: action.payload,
      };
    case LessonsActions.SELECT_GROUP_NAME:
      localStorage.setItem('lastGroup', action.payload);
      return { ...state, selectedGroup: action.payload };
    case LessonsActions.SELECT_DATE:
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
}
