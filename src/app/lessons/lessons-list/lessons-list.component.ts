import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Lesson } from '../lesson.model';
import { LessonsService } from '../lessons.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css'],
})
export class LessonsListComponent implements OnInit, OnDestroy {
  lessons: Lesson[] = [];
  date: Date;

  lessonsSub: Subscription;
  dateSub: Subscription;

  constructor(private lessonsService: LessonsService) {}

  ngOnInit(): void {
    const schedule = JSON.parse(localStorage.getItem('schedule'));
    if (schedule && schedule?.date && schedule?.lessons) {
      this.lessons = schedule.lessons;
      this.date = schedule.date;
    }

    console.log(this.date);

    this.lessonsSub = this.lessonsService.lessons.subscribe(
      (value) => (this.lessons = value)
    );
    this.dateSub = this.lessonsService.date.subscribe(
      (value) => (this.date = value)
    );
  }

  ngOnDestroy(): void {
    if (this.lessonsSub) this.lessonsSub.unsubscribe();
    if (this.dateSub) this.dateSub.unsubscribe();
  }
}
