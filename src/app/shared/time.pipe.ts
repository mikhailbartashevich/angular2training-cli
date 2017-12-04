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

    const hoursString = (hours < 10) ? '0' + hours : hours;
    const minutesString = (minutes < 10) ? '0' + minutes : minutes;
    const secondsString = (seconds < 10) ? '0' + seconds : seconds;

    return `${hoursString} : ${minutesString} : ${secondsString}`;
  }

}
