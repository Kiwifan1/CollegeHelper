import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money',
  standalone: true,
})
export class MoneyPipe implements PipeTransform {
  transform(value: unknown | number, ...args: unknown[]): unknown {
    if (typeof value == 'string') {
      value = value.replace(/,/g, '');
      if ((value as string).includes(' - ')) {
        // multiple values
        let values = (value as string).split(' - ');
        let num1 = parseInt(values[0]);
        let num2 = parseInt(values[1]);

        if (num1 && num2) {
          return (
            '$' +
            num1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
            ' - ' +
            '$' +
            num2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          );
        }
      } else {
        value = parseInt(value as string);
      }
    }

    if (!value || value == -1 || typeof value != 'number') {
      return 'Not Available';
    }

    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
