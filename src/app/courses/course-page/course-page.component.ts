import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from '../courses.service';
import { CourseDetails } from '../course-details.model';
import { FilterByTitlePipe } from '../pipes/filter-by-title.pipe';
import { Subject } from 'rxjs/Subject';
import 'rxjs/operators/takeUntil'; 

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
    this.coursesService.getList()
        // .takeUntil(this.subject)
        .subscribe((courses: CourseDetails[]) => this.courses = courses);
  }

  public onDeleteCourse(course: CourseDetails) {
    this.coursesService.removeCourse(course)
        // .takeUntil(this.subject)
        .subscribe((courses: CourseDetails[]) => this.courses = courses);
  }

  public onFindCourse(title: string) {
    this.coursesService.getList()
        // .takeUntil(this.subject)
        .subscribe((courses: CourseDetails[]) => 
          this.courses = this.filterByTitlePipe.transform(courses, title) 
        );
  }

  public ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }

}
