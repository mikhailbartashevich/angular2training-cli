import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coursesTimeMsPipe'
})
export class TimePipe implements PipeTransform {

  public transform(value: number): string {
    return this.msToTime(value);
  }

  private msToTime(duration: number): string {
    const seconds = Math.round((duration / 1000) % 60);
    const minutes = Math.round((duration / (1000 * 60)) % 60);
    const hours = Math.round((duration / (1000 * 60 * 60)) % 24);

    if (hours) {
      return `${hours}h ${minutes}min ${seconds}sec`;
    } else if (minutes) {
      return `${minutes}min ${seconds}sec`;
    } else {
      return `${seconds}sec`;
    }
  }

}
