import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-course-toolbox',
  templateUrl: './course-toolbox.component.html',
  styleUrls: ['./course-toolbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseToolboxComponent {
  @Output() public findCourse = new EventEmitter<string>();

  public searchField: string;

  public onFindButtonClick() {
    this.findCourse.emit(this.searchField);
  }

}
