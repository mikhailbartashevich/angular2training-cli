import { Component } from '@angular/core';

@Component({
  selector: 'app-course-toolbox',
  templateUrl: './course-toolbox.component.html',
  styleUrls: ['./course-toolbox.component.css']
})
export class CourseToolboxComponent {

  private searchField_: string;

  // TODO: form onsubmit
  public onFindButtonClick() {
    console.log(this.searchField_);
  }

}
