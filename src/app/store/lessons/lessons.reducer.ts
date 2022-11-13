import { Group } from 'src/app/types/group.model';
import { Schedule } from '../../types/schedule.model';
import {
  FETCH_SCHEDULE,
  ScheduleActions,
  SELECT_DATE,
  SELECT_GROUP_ID,
  SET_ERROR,
  SET_GROUPS,
  SET_SCHEDULE,
} from './lessons.actions';

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
  action: ScheduleActions
) {
  switch (action.type) {
    case FETCH_SCHEDULE:
      return { ...state, isLoading: true };
    case SET_GROUPS:
      return { ...state, groups: action.payload };
    case SET_SCHEDULE:
      return {
        ...state,
        loadedSchedule: action.payload,
        isLoading: false,
        errorMessage: null,
      };
    case SET_ERROR:
      return {
        ...state,
        loadedSchedule: null,
        isLoading: false,
        errorMessage: action.payload,
      };
    case SELECT_GROUP_ID:
      return { ...state, selectedGroupId: action.payload };
    case SELECT_DATE:
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
}
