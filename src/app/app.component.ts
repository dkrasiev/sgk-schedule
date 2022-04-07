import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';
import { fadeInOut } from './animations/fadeInOut.animation';
import * as LessonsActions from './lessons/store/lessons.actions';
import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInOut(300)],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new LessonsActions.LoadLastData());

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
