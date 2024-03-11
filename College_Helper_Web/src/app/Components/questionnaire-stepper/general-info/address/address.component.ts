import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeoLocationService } from 'src/app/Services/geolocation.service';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  @Input() addressForms!: FormGroup[];

  constructor(
    private loadingService: LoadingService,
    private geoLocationService: GeoLocationService
  ) {}

  addAddress() {
    this.addressForms.push(
      new FormGroup({
        street: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        province: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        postCode: new FormControl('', [Validators.required]),
      })
    );
  }

  removeAddress(index: number) {
    this.addressForms.splice(index, 1);
  }
}
