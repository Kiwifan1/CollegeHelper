import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateColor',
  standalone: true
})
export class DateColorPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    // given a date, return a color based on how close it is to today
    let startDate = value.split('/');
    let start = new Date(startDate[2], startDate[0] - 1, startDate[1]);
    let today = new Date();
    let diff = start.getTime() - today.getTime();
    let days = Math.ceil(diff / (1000 * 3600 * 24));
    if (days < 0) {
      return 'red';
    } else if (days < 7) {
      return 'yellow';
    } else {
      return 'green';
    }
  }

}
