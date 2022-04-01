import { Lesson } from "../lesson.model";

export const LOAD_LESSONS = '[Lessons] Load Lessons';
export const FETCH_LESSONS = '[Lessons] Fetch Lessons';
export const SET_ERROR = '[Lessons] Set Error';

export class LoadLessons {
  readonly type = LOAD_LESSONS;
  constructor(public payload: Lesson[]) {};
}
export class FetchLessons {
  readonly type = FETCH_LESSONS;
  constructor() {};
}
export class SetError {
  readonly type = SET_ERROR;
  constructor(public payload: string) {};
}

export type LessonsActions =
| LoadLessons
| FetchLessons
| SetError

