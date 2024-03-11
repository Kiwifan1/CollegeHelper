import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pc',
  standalone: true,
})
export class PercentPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value || value == -1) {
      return 'Not Available';
    }
    return value + '%';
  }
}
