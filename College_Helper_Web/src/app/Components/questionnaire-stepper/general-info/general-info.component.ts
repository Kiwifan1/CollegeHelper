import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Address } from 'src/app/Objects/Address';
import {
  EducationLevel,
  Ethnicity,
  Gender,
  IncomeLevel,
  MaritalStatus,
  Occupation,
} from 'src/app/Objects/User/Demographics';
import { GeoLocationService } from 'src/app/Services/geolocation.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss',
})
export class GeneralInfoComponent implements OnInit {
  genderEnums = Object.values(Gender);
  educationLevelEnums = Object.values(EducationLevel);
  ethnicityEnums = Object.values(Ethnicity);
  incomeLevelEnums = Object.keys(IncomeLevel);
  maritalStatusEnums = Object.values(MaritalStatus);
  occupationEnums = Object.values(Occupation);

  address: Address = {
    city: '',
    province: '',
    country: '',
    postCode: '',
    street: '',
    website: null,
  };

  grabbedLocation = false;

  @Input() generalUserInfoForm!: FormGroup;

  constructor(private geoLocationService: GeoLocationService) {}

  ngOnInit(): void {}

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      this.geoLocationService
        .getAddressFromLatLong(lat, long)
        .subscribe((res: any) => {
          this.address.city = res.address.city ?? '';
          this.address.province = res.address.state ?? '';
          this.address.country = res.address.country_code ?? '';
          this.address.postCode = res.address.postcode ?? '';
          this.address.street = res.address.road ?? '';

          this.generalUserInfoForm.patchValue({
            location: this.stringify(this.address),
          });
        });
    });
  }

  objectify(address: string) {
    const split = address.split(', ');
    return {
      street: split[0],
      city: split[1].split(' ')[0],
      state: split[1].split(' ')[1],
      zip: split[2],
      website: null,
    };
  }

  stringify(address: Address) {
    const stateExists = address.province ? ' ' : '';
    const zipExists = address.postCode ? ', ' : '';
    return `${address.street}, ${address.city}${stateExists}${address.province}${zipExists}${address.postCode}`;
  }
}
