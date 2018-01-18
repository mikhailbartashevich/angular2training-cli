import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CourseDetails } from '../course-details.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CoursesService } from '../courses.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursePageComponent {
  @Input() public courseDetails: CourseDetails;
  @Output() public saveCourse = new EventEmitter<CourseDetails>();

  public availableAuthors = ['Test Author', 'Test Author1', 'Test Author2'];

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private route: ActivatedRoute
  ) {
    this.route.params
    .pipe(
      map(param => param.id),
      map(id => this.coursesService.getCourseById(id))
    )
    .subscribe((courseDetails: any) => {
      this.courseDetails = courseDetails;
    });
    this.courseDetails = new CourseDetails(0, null, 0, 0, null, false, []);
  }

  public onFormSubmit(form: NgForm) {
    if (form.valid) {
      this.coursesService.createCourse(this.courseDetails)
      .subscribe(() => this.router.navigate(['courses']));
    }
  }

  public onCancelButtonClick() {
    this.router.navigate(['courses']);
  }

}
