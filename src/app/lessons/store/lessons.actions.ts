import { Action } from '@ngrx/store';
import { Group } from '../group.model';
import { Schedule } from '../schedule.model';

export const SET_SCHEDULE = '[Schedule] Set Schedule';
export const FETCH_SCHEDULE = '[Schedule] Fetch Schedule';
export const SET_ERROR = '[Schedule] Set Error';
export const FETCH_GROUPS = '[Schedule] Fetch Groups';
export const SET_GROUPS = '[Schedule] Set Groups';
export const SELECT_GROUP_NAME = '[Schedule] Select Group Name';
export const SELECT_DATE = '[Schedule] Select Date';
export const LOAD_LAST_DATA = '[Schedule] Load Last Data';

export class SetSchedule implements Action {
  readonly type = SET_SCHEDULE;
  constructor(public payload: Schedule) {}
}
export class FetchSchedule implements Action {
  readonly type = FETCH_SCHEDULE;
  constructor() {}
}
export class SetGroups implements Action {
  readonly type = SET_GROUPS;
  constructor(public payload: Group[]) {}
}
export class FetchGroups implements Action {
  readonly type = FETCH_GROUPS;
  constructor() {}
}
export class SetError implements Action {
  readonly type = SET_ERROR;
  constructor(public payload: string) {}
}
export class SelectGroupName implements Action {
  readonly type = SELECT_GROUP_NAME;
  constructor(public payload: string) {}
}
export class SelectDate implements Action {
  readonly type = SELECT_DATE;
  constructor(public payload: Date) {}
}
export class LoadLastData implements Action {
  readonly type = LOAD_LAST_DATA;
  constructor(public payload: Date) {}
}

export type ScheduleActions =
  | SetSchedule
  | FetchSchedule
  | SetError
  | FetchGroups
  | SetGroups
  | SelectGroupName
  | LoadLastData
  | SelectDate;
