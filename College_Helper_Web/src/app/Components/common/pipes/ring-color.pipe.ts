import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ringColor',
  standalone: true,
})
export class RingColorPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): string {
    // given a number from 0.00 to 100.00 return a color ranging from red to green
    if (typeof value !== 'number') {
      return 'black';
    }
    // return a color based on the value
    if (value <= 50) {
      // red to yellow
      const red = 255;
      const green = Math.round((value / 50) * 255);
      const blue = 0;
      return `rgb(${red}, ${green}, ${blue})`;
    } else {
      // yellow to green
      const red = Math.round(((100 - value) / 50) * 255);
      const green = 255;
      const blue = 0;
      return `rgb(${red}, ${green}, ${blue})`;
    }
  }
}
