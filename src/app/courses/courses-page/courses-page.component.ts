import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CoursesService } from '../courses.service';
import { CourseDetails } from '../course-details.model';
import { LoaderBlockService } from '../../shared/loader-block.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageComponent implements OnInit, OnDestroy {

  public courses$: Observable<CourseDetails[]>;
  private subject: Subject<CourseDetails[]> = new Subject();
  private start = 0;
  private count = 10;

  constructor(
    private coursesService: CoursesService,
    private loaderBlockService: LoaderBlockService,
  ) {}

  public ngOnInit() {
    // TODO: Is it ok to re-assign observable?
    this.courses$ = this.coursesService.getList(this.start, this.count);
  }

  public onPreviousCoursesButtonClick() {
    this.start = this.start >= 10 ? this.start - 10 : 0;
    this.courses$ = this.coursesService.getList(this.start, this.count);
  }

  public onNextCoursesButtonClick() {
    this.start += 10;
    this.courses$ = this.coursesService.getList(this.start, this.count);
  }

  public onDeleteCourse(course: CourseDetails) {
    this.loaderBlockService.show();
    this.coursesService.removeCourse(course)
      .pipe(
        takeUntil(this.subject),
      )
      .subscribe(() => {
        this.loaderBlockService.hide();
        this.courses$ = this.coursesService.getList(0, this.count);
      });
  }

  public onFindCourse(courseName: string) {
    this.courses$ = this.coursesService.findCourses(courseName);
  }

  public ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }

}
