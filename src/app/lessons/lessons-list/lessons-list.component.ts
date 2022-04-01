import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Lesson } from '../lesson.model';
import { LessonsService } from '../lessons.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css'],
  animations: [
    trigger('in', [
      transition('void => *', [style({ opacity: 0 }), animate(300)]),
      // transition('* => void', [
      //   style({ position: 'absolute' }),
      //   animate(0, style({ opacity: 0 })),
      // ]),
    ]),
  ],
})
export class LessonsListComponent implements OnInit, OnDestroy {
  // lessons: Lesson[] = [];
  // date: Date;

  schedule: { date: Date; lessons: Lesson[] };
  error: string;

  // lessonsSub: Subscription;
  // dateSub: Subscription;
  scheduleSub: Subscription;
  errorSub: Subscription;

  constructor(private lessonsService: LessonsService) {}

  ngOnInit(): void {
    const schedule = JSON.parse(localStorage.getItem('schedule'));
    if (schedule && schedule?.date && schedule?.lessons) {
      this.schedule = schedule;
      // this.lessons = schedule.lessons;
      // this.date = schedule.date;
    }

    // this.lessonsSub = this.lessonsService.lessons.subscribe(
    //   (value) => (this.lessons = value)
    // );
    // this.dateSub = this.lessonsService.date.subscribe(
    //   (value) => (this.date = value)
    // );

    this.scheduleSub = this.lessonsService.schedule.subscribe(
      (schedule) => (this.schedule = schedule)
    );
    this.errorSub = this.lessonsService.error.subscribe(
      (error) => (this.error = error)
    );
  }

  ngOnDestroy(): void {
    // if (this.lessonsSub) this.lessonsSub.unsubscribe();
    // if (this.dateSub) this.dateSub.unsubscribe();
    if (this.scheduleSub) this.scheduleSub.unsubscribe();
    if (this.errorSub) this.errorSub.unsubscribe();
  }
}
