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
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss',
})
export class GeneralInfoComponent implements OnInit {
  genderEnums = Object.values(Gender);
  educationLevelEnums = Object.values(EducationLevel);
  ethnicityEnums = Object.values(Ethnicity);
  incomeLevelEnums = Object.values(IncomeLevel);
  maritalStatusEnums = Object.values(MaritalStatus);
  occupationEnums = Object.values(Occupation);

  addressForm: FormGroup = new FormGroup({
    street: new FormControl(''),
    city: new FormControl(''),
    province: new FormControl(''),
    country: new FormControl(''),
    postCode: new FormControl(''),
  });

  address: Address = {
    street: '',
    city: '',
    province: '',
    country: '',
    postCode: '',
    website: '',
  };

  grabbedLocation = false;

  @Input() generalUserInfoForm!: FormGroup;

  constructor(
    private geoLocationService: GeoLocationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

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

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      this.loadingService.updateLoadingStatus(true);
      this.geoLocationService
        .getAddressFromLatLong(lat, long)
        .subscribe((res: any) => {
          this.addressForm.patchValue({
            street: res.address.road ?? '',
            city: res.address.city ?? '',
            province: res.address.state ?? '',
            country: res.address.country ?? '',
            postCode: res.address.postcode ?? '',
          });
          this.loadingService.updateLoadingStatus(false);
        });
    });
  }
}
