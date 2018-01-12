import { Injectable } from '@angular/core';
import { CourseDetails } from './course-details.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { map, concatMap, toArray } from 'rxjs/operators';
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

interface CreateResponse {
  id: string;
}

interface UpdateResponse {
  id: string;
}

@Injectable()
export class CoursesService {
  private baseUrl = 'http://localhost:3004';

  constructor(private http: HttpClient) {}

  public getList(start: number, count: number): Observable<CourseDetails[]>  {
    return this.convertServerSideResponse(
      this.http.get<ServerCourseDetails[]>(
        `${this.baseUrl}/courses?start=${start}&count=${count}`
      )
    );
  }

  public findCourses(name: string): Observable<CourseDetails[]>  {
    return this.convertServerSideResponse(
      this.http.get<ServerCourseDetails[]>(
        `${this.baseUrl}/courses/find?course=${name}`
      )
    );
  }

  public createCourse(coursedetails: CourseDetails): Observable<CreateResponse> {
    return of({id: '1'});
  }

  public updateCourse(coursedetails: CourseDetails): Observable<UpdateResponse> {
    return of({id: '1'});
  }

  public removeCourse(coursedetails: CourseDetails): Observable<DeleteResponse> {
    return this.http.get<DeleteResponse>(`${this.baseUrl}/courses/delete?id=${coursedetails.id}`);
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
