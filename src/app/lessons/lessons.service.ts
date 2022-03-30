import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';
import { Lesson } from '../shared/lesson.model';

@Injectable({ providedIn: 'root' })
export class LessonsService {
  lessons: Subject<Lesson[]> = new Subject<Lesson[]>();

  constructor(private http: HttpClient) {}

  fetchLessons(id: string, date: string) {
    this.http
      .get<{ date: string; lessons: Lesson[] }>(
        'https://asu.samgk.ru//api/schedule/' + id + '/' + date
      )
      .subscribe((value) => {
        this.lessons.next(value.lessons);
      });
  }
}
