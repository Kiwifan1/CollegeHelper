import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'src/app/Objects/Address';

@Pipe({
  name: 'address',
  standalone: true,
})
export class AddressPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) {
      return 'Not Available';
    }

    let address = value as Address;

    let addressString = '';

    if (address.street) {
      addressString += address.street + ', ';
    }

    if (address.city) {
      addressString += address.city + ', ';
    }

    if (address.province) {
      addressString += address.province + ', ';
    }

    if (address.country) {
      addressString += address.country + ', ';
    }

    if (address.postCode) {
      addressString += address.postCode;
    }

    return addressString;
  }
}
