import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-toolbox',
  templateUrl: './course-toolbox.component.html',
  styleUrls: ['./course-toolbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseToolboxComponent {
  @Output() public findCourse = new EventEmitter<string>();

  public searchField: string;

  constructor(private router: Router) {}

  public onFindButtonClick() {
    this.findCourse.emit(this.searchField);
  }

  public onAddCourseButtonClick() {
    this.router.navigate(['add-course']);
  }

}
