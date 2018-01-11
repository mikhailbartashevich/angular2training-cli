import { Injectable } from '@angular/core';
import { CourseDetails } from './course-details.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { map, concatMap, toArray } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

interface ServerCourseDetails {
  id: number;
  name: number;
  length: number;
  date: string;
  description: string;
  isTopRated: boolean;
}

interface DeleteResponse {
  deleted: string;
}

@Injectable()
export class CoursesService {

  private cachedCourses: CourseDetails[] = [];
  private cachedCourses$ = new Subject<CourseDetails[]>();
  private baseUrl = 'http://localhost:3004';

  constructor(private http: HttpClient) {}

  public getCachedCourses(): Subject<CourseDetails[]>  {
    return this.cachedCourses$;
  }

  public getList(start: number, count: number) {
    this.convertServerSideResponse(
      this.http.get<ServerCourseDetails[]>(
        `${this.baseUrl}/courses?start=${start}&count=${count}`
      )
    )
    .subscribe((courseDetails: CourseDetails[]) => {
      if (start === 0) {
        this.cachedCourses = [];
      }
      this.updateCache(courseDetails);
    });
  }

  public findCourse(name: string) {
    this.convertServerSideResponse(
      this.http.get<ServerCourseDetails[]>(
        `${this.baseUrl}/courses/find?course=${name}`
      )
    )
    .subscribe((courseDetails: CourseDetails[]) => {
      this.cachedCourses$.next(courseDetails);
    });
  }

  public createCourse(coursedetails: CourseDetails): void {}

  public updateCourse(coursedetails: CourseDetails): void {}

  public removeCourse(coursedetails: CourseDetails): Observable<DeleteResponse> {
    return this.http.get<DeleteResponse>(`${this.baseUrl}/courses/delete?id=${coursedetails.id}`);
  }

  private updateCache(courseDetails: CourseDetails[]) {
    this.cachedCourses = this.cachedCourses.concat(courseDetails);
    this.cachedCourses$.next(this.cachedCourses);
  }

  private convertServerSideResponse(httpResponse: Observable<ServerCourseDetails[]>): Observable<CourseDetails[]> {
    return httpResponse.pipe(
      concatMap((dbModelArray: ServerCourseDetails[]) => from(dbModelArray)),
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

}
