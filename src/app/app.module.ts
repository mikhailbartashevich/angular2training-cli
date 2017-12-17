import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { CoursesModule } from './courses/courses.module';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { AddCoursePageComponent } from './courses/add-course-page/add-course-page.component';
import { CoursePageComponent } from './courses/course-page/course-page.component';
import { SharedModule } from './shared/shared.module';

const Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'courses', component: CoursePageComponent},\
  {path: 'add-course', component: AddCoursePageComponent},
  {path: 'login', component: LoginPageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(Routes, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    LoginModule,
    CoursesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
