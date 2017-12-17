import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from '../courses.service';
import { CourseDetails } from '../course-details.model';
import { FilterByTitlePipe } from '../pipes/filter-by-title.pipe';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/operators/filter';
import 'rxjs/operators/concatMap';
import 'rxjs/operators/takeUntil';
import 'rxjs/operators/toArray'; 

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
  providers: [FilterByTitlePipe]
})
export class CoursePageComponent implements OnInit, OnDestroy {

  public courses: CourseDetails[];
  private subject: Subject<CourseDetails[]> = new Subject();

  constructor(private coursesService: CoursesService, private filterByTitlePipe: FilterByTitlePipe) {}

  public ngOnInit() {
    this.getUpToDateList()
        .subscribe((courses: CourseDetails[]) => this.courses = courses);
  }

  public onDeleteCourse(course: CourseDetails) {
    this.coursesService.removeCourse(course)
        // .takeUntil(this.subject)
        .subscribe((courses: CourseDetails[]) => this.courses = courses);
  }

  public onFindCourse(title: string) {
    this.getUpToDateList()
        .subscribe((courses: CourseDetails[]) => 
          this.courses = this.filterByTitlePipe.transform(courses, title) 
        );
  }

  public ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }

  private getUpToDateList(): Observable<CourseDetails[]> {
    return this.coursesService.getList();
        // .takeUntil(this.subject)
        // .concatMap((courses: CourseDetails[]) => Observable.from(courses))
        // .filter((course: CourseDetails) => {
        //   const currentDate = new Date();
        //   const lastTwoWeeks = new Date();
        //   lastTwoWeeks.setDate(currentDate.getDate() - 14);
        //   return new Date(course.creationDateMs) < lastTwoWeeks;
        // })
        // .toArray();
  }

}
