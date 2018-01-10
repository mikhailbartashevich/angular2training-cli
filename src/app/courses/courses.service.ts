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
  private coursesFake: CourseDetailsFake[];
  private baseUrl = 'http://localhost:3004';

  constructor(private http: Http) {
    this.coursesFake = [];
  }

  public getCachedCoursesArray(): CourseDetails[] {
    return this.cachedCourses;
  }

  public getCachedCourses(): Subject<CourseDetails[]>  {
    return this.cachedCourses$;
  }

  public getList(start: number, count: number) {
    this.convertServerSideResponse(this.http.get(`${this.baseUrl}/courses?start=${start}&count=${count}`))
      .subscribe((courseDetails: CourseDetails[]) => {
        this.updateCache(courseDetails);
      });
  }

  public findCourse(name: string) {
    this.convertServerSideResponse(this.http.get(`${this.baseUrl}/courses/find?course=${name}`))
      .subscribe((courseDetails: CourseDetails[]) => {
        this.cachedCourses$.next(courseDetails);
      });
  }

  private updateCache(courseDetails: CourseDetails[]) {
    this.cachedCourses = this.cachedCourses.concat(courseDetails);
    this.cachedCourses$.next(this.cachedCourses);
  }

  private convertServerSideResponse(httpResponse: Observable<any>): Observable<CourseDetails[]> {
    return httpResponse.pipe (
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
    );
  }

  public createCourse(coursedetails: CourseDetails): Observable<CourseDetailsFake[]> {
    this.coursesFake.push(new CourseDetailsFake(
      coursedetails.id,
      coursedetails.title,
      coursedetails.durationMs,
      coursedetails.creationDateMs,
      coursedetails.description,
      coursedetails.topRated
    ));
    return of(this.coursesFake);
  }

  public updateCourse(coursedetails: CourseDetails): Observable<CourseDetailsFake[]> {
    const index = this.coursesFake.findIndex((course) => course.idFake === coursedetails.id);
    this.coursesFake[index] = new CourseDetailsFake(
      coursedetails.id,
      coursedetails.title,
      coursedetails.durationMs,
      coursedetails.creationDateMs,
      coursedetails.description,
      coursedetails.topRated
    );
    return of(this.coursesFake);
  }

  public removeCourse(coursedetails: CourseDetails): Observable<CourseDetailsFake[]> {
    const index = this.coursesFake.findIndex((course) => course.idFake === coursedetails.id);
    this.coursesFake.splice(index, 1);
    return of(this.coursesFake);
  }

  public getCourseById(id: number): Observable<CourseDetailsFake> {
    return of(this.coursesFake.find((courseDetails) => courseDetails.idFake === id));
  }

}
