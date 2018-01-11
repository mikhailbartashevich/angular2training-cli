import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CoursesService } from '../courses.service';
import { CourseDetails } from '../course-details.model';
import { LoaderBlockService } from '../../shared/loader-block.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursePageComponent implements OnInit, OnDestroy {

  public courses$: Subject<CourseDetails[]>;
  private subject: Subject<CourseDetails[]> = new Subject();
  private start = 0;
  private count = 10;

  constructor(
    private coursesService: CoursesService,
    private loaderBlockService: LoaderBlockService,
  ) {}

  public ngOnInit() {
    this.courses$ = this.coursesService.getCachedCourses();
    this.coursesService.getList(this.start, this.count);
  }

  public onLoadMoreCoursesButtonClick() {
    this.start += 10;
    this.coursesService.getList(this.start, this.count);
  }

  public onDeleteCourse(course: CourseDetails) {
    this.loaderBlockService.show();
    this.coursesService.removeCourse(course)
      .pipe(
        takeUntil(this.subject),
      )
      .subscribe(() => {
        this.loaderBlockService.hide();
        this.coursesService.getList(0, this.count);
      });
  }

  public onFindCourse(courseName: string) {
    this.coursesService.findCourse(courseName);
  }

  public ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }

}
