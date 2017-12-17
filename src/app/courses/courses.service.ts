import { Injectable } from '@angular/core';
import { CourseDetails } from './course-details.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CoursesService {

  private courses: CourseDetails[];

  constructor() {
    this.courses = [];
    this.courses.push({
      id: 1,
      title: 'First course',
      description: 'First description',
      durationMs: 100000,
      creationDateMs: 1511188015987,
      topRated: false
    });

    this.courses.push({
      id: 2,
      title: 'Second course',
      description: 'Second description',
      durationMs: 110000,
      creationDateMs: 1513013411287,
      topRated: true
    });

    this.courses.push({
      id: 3,
      title: 'Third course',
      description: 'Third description',
      durationMs: 120000,
      creationDateMs: 1511188015987,
      topRated: false
    });
  }

  public getList(): Observable<CourseDetails[]> {
    return of(this.courses);
  }

  public createCourse(coursedetails: CourseDetails): Observable<CourseDetails[]> {
    this.courses.push(coursedetails);
    return of(this.courses);
  }

  public updateCourse(coursedetails: CourseDetails): Observable<CourseDetails[]> {
    const index = this.courses.findIndex((course) => course.id === coursedetails.id);
    this.courses[index] = coursedetails;
    return of(this.courses);
  }

  public removeCourse(coursedetails: CourseDetails): Observable<CourseDetails[]> {
    const index = this.courses.findIndex((course) => course.id === coursedetails.id);
    this.courses.splice(index, 1);
    return of(this.courses);
  }

  public getCourseById(id: number): Observable<CourseDetails> {
    return of(this.courses.find((courseDetails) => courseDetails.id === id));
  }

}
