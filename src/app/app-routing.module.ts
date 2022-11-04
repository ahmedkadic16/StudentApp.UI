import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TopNavComponent} from "./layout/top-nav/top-nav.component";
import {StudentsComponent} from "./students/students.component";

const routes: Routes = [
  { path: '#', component: StudentsComponent },
  { path: 'top-nav', component: TopNavComponent },
  { path: 'students', component: StudentsComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
