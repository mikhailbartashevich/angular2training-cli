import { Pipe, PipeTransform } from '@angular/core';
import { CourseDetails } from '../course-details.model';

@Pipe({
  name: 'filterByTitle'
})
export class FilterByTitlePipe implements PipeTransform {

  transform(array: CourseDetails[], title: string): CourseDetails[] {
    return array.filter((course: CourseDetails) => course.title.toLowerCase()
        .startsWith(title.toLowerCase()));
  }

}
