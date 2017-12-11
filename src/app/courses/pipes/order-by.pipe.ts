import { Pipe, PipeTransform } from '@angular/core';
import { CourseDetails } from '../course-details.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(courses: CourseDetails[]): CourseDetails[] {
    courses.sort((a: CourseDetails, b: CourseDetails) => {
      return a.creationDateMs - b.creationDateMs;
    });
    return courses;
  }

}
