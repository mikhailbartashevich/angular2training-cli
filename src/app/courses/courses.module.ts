import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './course-item/course-item.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { CourseToolboxComponent } from './course-toolbox/course-toolbox.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CourseItemComponent, CourseListComponent, CoursePageComponent, CourseToolboxComponent]
})
export class CoursesModule { }
