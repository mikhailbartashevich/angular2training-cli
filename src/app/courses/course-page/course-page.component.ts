import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { CourseDetails } from '../course-details.model';
import { CoursesService } from '../courses.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
})
export class CoursePageComponent implements OnDestroy {
  @Input() public courseDetails: CourseDetails = new CourseDetails(0, null, 0, 0, null, false, []);
  @Output() public saveCourse = new EventEmitter<CourseDetails>();

  public availableAuthors = ['Test Author', 'Test Author1', 'Test Author2'];
  private subject: Subject<CourseDetails[]> = new Subject();
  private url = '';

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.url.subscribe(
      (url: UrlSegment[]) => this.url = url[url.length - 1].path);
    this.activatedRoute.params
    .pipe(
      map(param => param.id),
      switchMap(id => this.coursesService.getCourseById(id)),
      takeUntil(this.subject)
    )
    .subscribe((courseDetails: CourseDetails) => {
      this.courseDetails = courseDetails;
    });
  }

  public onFormSubmit(form: NgForm) {
    if (form.valid) {
      if (this.url === 'new') {
        this.coursesService.createCourse(this.courseDetails)
        .subscribe(() => this.router.navigate(['courses']));
      } else {
        this.coursesService.updateCourse(this.courseDetails)
        .subscribe(() => this.router.navigate(['courses']));
      }
    }
  }

  public onCancelButtonClick() {
    this.router.navigate(['courses']);
  }

  public ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }

}
