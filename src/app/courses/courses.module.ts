import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule
} from '@angular/material';
import { CourseItemComponent } from './course-item/course-item.component';
import { CourseListComponent } from './course-list/course-list.component';
import { AddCoursePageComponent } from './add-course-page/add-course-page.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { CourseToolboxComponent } from './course-toolbox/course-toolbox.component';
import { SharedModule } from '../shared/shared.module';
import { CoursesService } from './courses.service';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { DynamicBorderDirective } from './directives/dynamic-border.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterByTitlePipe } from './pipes/filter-by-title.pipe';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    SharedModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [
    CourseItemComponent,
    CourseListComponent,
    AddCoursePageComponent,
    CoursePageComponent,
    CourseToolboxComponent,
    DeleteConfirmationDialogComponent,
    DynamicBorderDirective,
    OrderByPipe,
    FilterByTitlePipe
  ],
  entryComponents: [DeleteConfirmationDialogComponent],
  providers: [
    CoursesService,
    FilterByTitlePipe
  ]
})
export class CoursesModule { }
