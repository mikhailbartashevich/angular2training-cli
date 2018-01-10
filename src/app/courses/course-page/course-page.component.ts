import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CoursesService } from '../courses.service';
import { CourseDetails } from '../course-details.model';
import { CourseDetailsFake } from '../course-details-fake.model';
import { FilterByTitlePipe } from '../pipes/filter-by-title.pipe';
import { LoaderBlockService } from '../../shared/loader-block.service';
import { Subject } from 'rxjs/Subject';
import { from } from 'rxjs/observable/from';
import { concatMap, map, takeUntil, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
  providers: [FilterByTitlePipe],
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
    private filterByTitlePipe: FilterByTitlePipe,
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
          concatMap((courses: CourseDetailsFake[]) => from(courses)),
          map(
            (courseFake: CourseDetailsFake) =>
              new CourseDetails(
                courseFake.idFake,
                courseFake.titleFake,
                courseFake.durationMsFake,
                courseFake.creationDateMsFake,
                courseFake.descriptionFake,
                courseFake.topRatedFake
              )
          ),
          toArray()
        )
        .subscribe(
          (courses: CourseDetails[]) => {
            this.loaderBlockService.hide();
          }
        );
  }

  public onFindCourse(courseName: string) {
    this.coursesService.findCourse(courseName);
  }

  public ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }

  // private getUpToDateList(start: number, count: number) {
  //   return this.coursesService.getList(start, count)
  //       .pipe(
  //         concatMap((courses: CourseDetails[]) => from(courses)),
  //         filter((course: CourseDetails) => {
  //           const currentDate = new Date();
  //           const lastTwoWeeks = new Date();
  //           lastTwoWeeks.setDate(currentDate.getDate() - 360);
  //           return new Date(course.creationDateMs) > lastTwoWeeks;
  //         }),
  //         toArray()
  //       );
  // }

}
