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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
