import { Injectable } from '@angular/core';
import { CourseDetails } from './course-details.model';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { map, concatMap, toArray } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators/filter';

class ServerCourseDetails {
  id: number;
  name: string;
  length: number;
  date: string;
  description: string;
  isTopRated: boolean;
  authors: string[];


  constructor(
    id: number,
    title: string,
    durationMs: number,
    creationDate: string,
    description: string,
    topRated: boolean,
    authors: string[]
  ) {
    this.id = id;
    this.name = title;
    this.length = durationMs;
    this.date = creationDate;
    this.description = description;
    this.isTopRated = topRated;
    this.authors = authors;
  }
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

  public getCourseById(id: string): Observable<CourseDetails> {
    return this.http.get<ServerCourseDetails>(`${this.baseUrl}/courses/get?id=${id}`)
      .pipe(
        filter((dbModel: ServerCourseDetails) => dbModel != null),
        map((dbModel: ServerCourseDetails) => new CourseDetails(
            dbModel.id,
            dbModel.name,
            dbModel.length * 60 * 1000,
            new Date(dbModel.date).getTime(),
            dbModel.description,
            dbModel.isTopRated,
            dbModel.authors
          )
        )
      );
  }

  public createCourse(coursedetails: CourseDetails): Observable<CreateResponse> {
    const course = this.transformToServerSideCourse_(coursedetails);
    return this.http.post<CreateResponse>(`${this.baseUrl}/courses/new`, {course});
  }

  public updateCourse(coursedetails: CourseDetails): Observable<UpdateResponse> {
    const course = this.transformToServerSideCourse_(coursedetails);
    return this.http.post<UpdateResponse>(`${this.baseUrl}/courses/update`, {course});
  }

  public removeCourse(coursedetails: CourseDetails): Observable<DeleteResponse> {
    return this.http.get<DeleteResponse>(`${this.baseUrl}/courses/delete?id=${coursedetails.id}`);
  }

  private transformToServerSideCourse_(course: CourseDetails): ServerCourseDetails {
    return new ServerCourseDetails(
      course.id,
      course.title,
      course.durationMs / 60 / 1000,
      new Date(course.creationDateMs).toLocaleDateString(),
      course.description,
      course.topRated,
      course.authors
    );
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
        dbModel.isTopRated,
        dbModel.authors
      )),
      toArray()
    );
  }

}
