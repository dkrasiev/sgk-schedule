import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { take } from 'rxjs';
import { LessonsService } from './lessons/lessons.service';
import { Lesson } from './shared/lesson.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  groupName: string = '187';
  date: Date;

  constructor(
    private http: HttpClient,
    private lessonsService: LessonsService
  ) {}

  onLoadSchedule() {
    this.lessonsService.fetchLessons(
      this.groupName,
      this.date.toISOString().split('T')[0]
    );
  }
}
