import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';
import { fadeInOut } from './animations/fadeInOut.animation';
import * as LessonsActions from 'src/app/store/lessons/lessons.actions';
import * as fromApp from './store/app.reducer';
import { Group } from './types/group.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInOut(300)],
})
export class AppComponent implements OnInit {
  groups: Group[] = [];
  error: string = '';

  constructor(
    private store: Store<fromApp.AppState>,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new LessonsActions.LoadLastData());

    this.store.select('lessons').subscribe((lessonsState) => {
      this.groups = lessonsState.groups;
      this.error = lessonsState.errorMessage;
    });

    this.swUpdate.checkForUpdate().then((updateAvailable) => {
      if (updateAvailable) {
        this.snackBar
          .open('New update is available', 'Refresh page')
          .onAction()
          .subscribe(() => {
            window.location.reload();
          });
      }
    });
  }
}
