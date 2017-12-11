import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { CourseDetails } from '../course-details.model';
import { FilterByTitlePipe } from '../pipes/filter-by-title.pipe';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
  providers: [FilterByTitlePipe]
})
export class CoursePageComponent implements OnInit {

  public courses: CourseDetails[];

  constructor(private coursesService: CoursesService, private filterByTitlePipe: FilterByTitlePipe) {}

  public ngOnInit() {
    this.courses = this.coursesService.getList();
  }

  public onDeleteCourse(course: CourseDetails) {
    this.courses = this.coursesService.removeCourse(course);
  }

  public onFindCourse(title: string) {
    this.courses = this.filterByTitlePipe.transform(this.coursesService.getList(), title);
  }

}
