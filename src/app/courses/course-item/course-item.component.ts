import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CourseDetails } from '../course-details.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {
  @Input() public courseDetails: CourseDetails;
  @Output() public deleteCourse = new EventEmitter<CourseDetails>();

  public ngOnInit() {
    console.log('hello `Course item` ');
  }

  public onDeleteCourseButtonClick() {
    this.deleteCourse.emit(this.courseDetails);
  }

}
