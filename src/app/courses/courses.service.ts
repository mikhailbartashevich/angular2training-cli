import { Injectable } from '@angular/core';
import { CourseDetails } from './course-details.model';
import { CourseDetailsFake } from './course-details-fake.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { map, toArray, concatMap } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CoursesService {

  private cachedCourses: CourseDetails[] = [];
  private cachedCourses$ = new Subject<CourseDetails[]>();
  private courses: CourseDetailsFake[];
  private baseUrl = 'http://localhost:3004';

  constructor(private http: Http) {
    this.courses = [];
  }

  public getCachedCoursesArray(): CourseDetails[] {
    return this.cachedCourses;
  }

  public getCachedCourses(): Subject<CourseDetails[]>  {
    return this.cachedCourses$;
  }

  public getList(start: number, count: number) {
    this.http.get(`${this.baseUrl}/courses?start=${start}&count=${count}`)
      .pipe (
        map((response: Response) => response.json()),
        concatMap((dbModelArray: any[]) => from(dbModelArray)),
        map((dbModel: any) => new CourseDetails(
          dbModel.id,
          dbModel.name,
          dbModel.length * 60 * 1000,
          new Date(dbModel.date).getTime(),
          dbModel.description,
          dbModel.isTopRated
        )),
        toArray()
      ).subscribe((courseDetails: CourseDetails[]) => {
        this.cachedCourses = this.cachedCourses.concat(courseDetails);
        this.cachedCourses$.next(this.cachedCourses);
      });
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
