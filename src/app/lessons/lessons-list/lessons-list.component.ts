import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Lesson } from '../lesson.model';
import { LessonsService } from '../lessons.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit, OnDestroy {
  lessons: Lesson[] = [];

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
