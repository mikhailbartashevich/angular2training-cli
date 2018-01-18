import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { CoursesModule } from './courses/courses.module';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { CoursesPageComponent } from './courses/courses-page/courses-page.component';
import { CoursePageComponent } from './courses/course-page/course-page.component';
import { SharedModule } from './shared/shared.module';
import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';

const Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'courses', component: CoursesPageComponent},
  {path: 'courses/new', component: CoursePageComponent},
  {path: 'courses/:id', component: CoursePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: '**', component: NotFoundPageComponent},
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
