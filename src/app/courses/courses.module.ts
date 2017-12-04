import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseItemComponent } from './course-item/course-item.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { CourseToolboxComponent } from './course-toolbox/course-toolbox.component';
import { SharedModule } from '../shared/shared.module';
import { CoursesService } from './courses.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    CourseItemComponent,
    CourseListComponent,
    CoursePageComponent,
    CourseToolboxComponent
  ],
  providers: [CoursesService]
})
export class CoursesModule { }
