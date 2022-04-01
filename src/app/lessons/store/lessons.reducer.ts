import { Lesson } from '../lesson.model';
import * as LessonsActions from './lessons.actions';

export interface State {
  lessons: Lesson[];
  errorMessage: string;
}

const initialState: State = {
  lessons: [],
  errorMessage: null,
};

export function lessonsReducer(state, action: LessonsActions.LessonsActions) {
  switch (action.type) {
    case LessonsActions.LOAD_LESSONS:
      return { ...state, lessons: action.payload };
    case LessonsActions.SET_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
