import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LessonsListComponent } from './lessons/lessons-list/lessons-list.component';
import { LessonsLoadMenuComponent } from './lessons/lessons-load-menu/lessons-load-menu.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AppComponent, LessonsListComponent, LessonsLoadMenuComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
