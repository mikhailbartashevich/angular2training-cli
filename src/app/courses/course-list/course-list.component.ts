import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CourseDetails } from '../course-details.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent {

  @Input() public courses: CourseDetails[];
  @Output() public deleteCourse = new EventEmitter<CourseDetails>();

  public onDeleteCourse(course: CourseDetails) {
    this.deleteCourse.emit(course);
  }

  public trackByCourseId(index: number, course: CourseDetails) {
    return course.id;
  }

}
