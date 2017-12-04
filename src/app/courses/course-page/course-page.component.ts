import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { CourseDetails } from '../course-details.model';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {

  public courses: CourseDetails[];

  constructor(private coursesService: CoursesService) {}

  public ngOnInit() {
    this.courses = this.coursesService.getList();
  }

  public onDeleteCourse(course: CourseDetails) {
    this.courses = this.coursesService.removeCourse(course);
  }

}
