import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { LessonsListComponent } from './lessons/lessons-list/lessons-list.component';
import { LessonsLoadMenuComponent } from './lessons/lessons-load-menu/lessons-load-menu.component';
import { LessonsEffects } from './lessons/store/lessons.effects';
import { MaterialModule } from './material.module';
import * as fromApp from './store/app.reducer';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, LessonsListComponent, LessonsLoadMenuComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([LessonsEffects]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
