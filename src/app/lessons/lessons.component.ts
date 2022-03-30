import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Lesson } from '../shared/lesson.model';
import { LessonsService } from './lessons.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
})
export class LessonsComponent implements OnInit, OnDestroy {
  @Input() lessons: Lesson[];

  lessonsSub: Subscription;

  constructor(private lessonsService: LessonsService) {}

  ngOnInit(): void {
    this.lessonsSub = this.lessonsService.lessons.subscribe((value) => {
      this.lessons = value;
    });
  }

  ngOnDestroy(): void {
    this.lessonsSub.unsubscribe();
  }
}
