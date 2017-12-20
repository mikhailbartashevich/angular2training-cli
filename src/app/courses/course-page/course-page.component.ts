import { Component, OnInit, OnDestroy, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { CoursesService } from '../courses.service';
import { CourseDetails } from '../course-details.model';
import { CourseDetailsFake } from '../course-details-fake.model';
import { FilterByTitlePipe } from '../pipes/filter-by-title.pipe';
import { LoaderBlockService } from '../../shared/loader-block.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { concatMap, map, filter, takeUntil, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
  providers: [FilterByTitlePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursePageComponent implements OnInit, OnDestroy {

  public courses: CourseDetails[];
  private subject: Subject<CourseDetails[]> = new Subject();

  constructor(
    private coursesService: CoursesService,
    private loaderBlockService: LoaderBlockService,
    private filterByTitlePipe: FilterByTitlePipe,
    private ngZone: NgZone
  ) {}

  public ngOnInit() {
    this.ngZone.onUnstable
        .subscribe(() => console.log('unstable ' + new Date()));
    this.ngZone.onStable
        .subscribe(() => console.log('stable ' + new Date()));

    this.getUpToDateList()
        .subscribe((courses: CourseDetails[]) => this.courses = courses);
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
            this.courses = courses;
            this.loaderBlockService.hide();
          }
        );
  }

  public onFindCourse(title: string) {
    this.getUpToDateList()
        .pipe(
          map((courses: CourseDetails[]) => this.filterByTitlePipe.transform(courses, title))
        )
        .subscribe((courses: CourseDetails[]) => this.courses = courses);
  }

  public ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }

  private getUpToDateList(): Observable<CourseDetails[]> {
    return this.coursesService.getList()
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
          filter((course: CourseDetails) => {
            const currentDate = new Date();
            const lastTwoWeeks = new Date();
            lastTwoWeeks.setDate(currentDate.getDate() - 30);
            return new Date(course.creationDateMs) > lastTwoWeeks;
          }),
          toArray()
        );
  }

}
