import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  @Input() generalUserInfoForm!: FormGroup;
  grabbedLocation = false;

  genderEnums = Object.values(Gender);
  educationLevelEnums = Object.values(EducationLevel);
  ethnicityEnums = Object.values(Ethnicity);
  incomeLevelEnums = Object.values(IncomeLevel);
  maritalStatusEnums = Object.values(MaritalStatus);
  occupationEnums = Object.values(Occupation);

  addressForms: FormGroup[] = [
    new FormGroup({
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      postCode: new FormControl('', [Validators.required]),
    }),
  ];

  address: Address = {
    street: '',
    city: '',
    province: '',
    country: '',
    postCode: '',
    website: '',
    latitude: '',
    longitude: '',
  };
  constructor(
    private geoLocationService: GeoLocationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      this.loadingService.updateLoadingStatus(true);
      this.geoLocationService
        .getAddressFromLatLong(lat, long)
        .subscribe((res: any) => {
          this.addressForms[0].patchValue({
            street: res.address.road ?? '',
            city: res.address.city ?? '',
            province: res.address.state ?? '',
            country: res.address.country ?? '',
            postCode: res.address.postcode ?? '',
            latitude: lat,
            longitude: long,
          });
          this.loadingService.updateLoadingStatus(false);
        });
    });
  }

  bindAddress() {
    // add all the address forms to the user object
    this.generalUserInfoForm.patchValue({
      addresses: this.addressForms.map((address) => address.value),
    });
  }
}
