import { Injectable } from '@angular/core';
import { CourseDetails } from './course-details.model';
import { CourseDetailsFake } from './course-details-fake.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CoursesService {

  private courses: CourseDetailsFake[];

  constructor() {
    this.courses = [];
    this.courses.push({
      idFake: 1,
      titleFake: 'First course',
      descriptionFake: 'First description',
      durationMsFake: 100000,
      creationDateMsFake: 1511188015987,
      topRatedFake: false
    });

    this.courses.push({
      idFake: 2,
      titleFake: 'Second course',
      descriptionFake: 'Second description',
      durationMsFake: 110000,
      creationDateMsFake: 1513013411287,
      topRatedFake: true
    });

    this.courses.push({
      idFake: 3,
      titleFake: 'Third course',
      descriptionFake: 'Third description',
      durationMsFake: 120000,
      creationDateMsFake: 1511188015987,
      topRatedFake: false
    });
  }

  public getList(): Observable<CourseDetailsFake[]> {
    return of(this.courses);
  }

  public createCourse(coursedetails: CourseDetails): Observable<CourseDetailsFake[]> {
    this.courses.push(new CourseDetailsFake(
      coursedetails.id,
      coursedetails.title,
      coursedetails.durationMs,
      coursedetails.creationDateMs,
      coursedetails.description,
      coursedetails.topRated
    ));
    return of(this.courses);
  }

  public updateCourse(coursedetails: CourseDetails): Observable<CourseDetailsFake[]> {
    const index = this.courses.findIndex((course) => course.idFake === coursedetails.id);
    this.courses[index] = new CourseDetailsFake(
      coursedetails.id,
      coursedetails.title,
      coursedetails.durationMs,
      coursedetails.creationDateMs,
      coursedetails.description,
      coursedetails.topRated
    );
    return of(this.courses);
  }

  public removeCourse(coursedetails: CourseDetails): Observable<CourseDetailsFake[]> {
    const index = this.courses.findIndex((course) => course.idFake === coursedetails.id);
    this.courses.splice(index, 1);
    return of(this.courses);
  }

  public getCourseById(id: number): Observable<CourseDetailsFake> {
    return of(this.courses.find((courseDetails) => courseDetails.idFake === id));
  }

}
