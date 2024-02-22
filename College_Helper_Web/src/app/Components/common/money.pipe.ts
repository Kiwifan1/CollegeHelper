import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money',
  standalone: true,
})
export class MoneyPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value || value == -1 || typeof value != 'number') {
      return 'Not Available';
    }
    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
