import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GroupsResolver } from './lessons/group.resolver';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    resolve: {
      groups: GroupsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
