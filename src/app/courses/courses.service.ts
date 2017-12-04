import { Injectable } from '@angular/core';
import { CourseDetails } from './course-details.model';

@Injectable()
export class CoursesService {

  private courses: CourseDetails[];

  constructor() {
    this.courses = [];
    this.courses.push({
      id: 1,
      title: 'First course',
      description: 'First description',
      duration_ms: 100000,
      creation_date_ms: 1511188015987,
    });

    this.courses.push({
      id: 2,
      title: 'Second course',
      description: 'Second description',
      duration_ms: 110000,
      creation_date_ms: 1511188015987,
    });

    this.courses.push({
      id: 3,
      title: 'Third course',
      description: 'Third description',
      duration_ms: 120000,
      creation_date_ms: 1511188015987,
    });
  }

  public getList(): CourseDetails[] {
    return this.courses;
  }

  public createCourse(coursedetails: CourseDetails): CourseDetails[] {
    this.courses.push(coursedetails);
    return this.courses;
  }

  public updateCourse(coursedetails: CourseDetails): CourseDetails[] {
    const index = this.courses.findIndex((course) => course.id === coursedetails.id);
    this.courses[index] = coursedetails;
    return this.courses;
  }

  public removeCourse(coursedetails: CourseDetails): CourseDetails[] {
    const index = this.courses.findIndex((course) => course.id === coursedetails.id);
    this.courses.splice(index, 1);
    return this.courses;
  }

  public getCourseById(id: number): CourseDetails {
    return this.courses.find((courseDetails) => courseDetails.id === id);
  }

}
