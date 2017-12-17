import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CourseDetails } from '../course-details.model';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCoursePageComponent {
  @Input() public courseDetails: CourseDetails;
  @Output() public saveCourse = new EventEmitter<CourseDetails>();

  constructor() {}

  public onSaveCourseButtonClick() {}
  public onCancelCourseButtonClick() {}

}
