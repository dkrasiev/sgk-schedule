import { Group } from 'src/app/types/group.model';
import { Schedule } from '../../types/schedule.model';
import * as LessonsActions from './lessons.actions';

export interface State {
  selectedGroupId: number;
  selectedDate: Date;
  loadedSchedule: Schedule;
  groups: Group[];
  errorMessage: string;
  isLoading: boolean;
}

const initialState: State = {
  selectedGroupId: null,
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
    case LessonsActions.SELECT_GROUP_ID:
      return { ...state, selectedGroupId: action.payload };
    case LessonsActions.SELECT_DATE:
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
}
