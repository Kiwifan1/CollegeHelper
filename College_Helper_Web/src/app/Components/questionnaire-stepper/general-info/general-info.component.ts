import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/Objects/Address';
import {
  EducationLevel,
  IncomeLevel,
  MaritalStatus,
  Occupation,
} from 'src/app/Objects/User/UserDemographics';
import { CitizenshipStatusesEnum } from 'src/app/Objects/enums/Citizenship';
import { DegreeSeekingEnum } from 'src/app/Objects/enums/DegreeSeekings';
import {
  EthnicityEnum,
  GenderIdentityEnum,
  NationalityEnum,
  SexualOrientationEnum,
} from 'src/app/Objects/enums/Demographics';
import { GeoLocationService } from 'src/app/Services/geolocation.service';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.scss',
})
export class GeneralInfoComponent implements OnInit, OnDestroy {
  @Input() userInfoForm!: FormGroup;
  grabbedLocation = false;

  demographicForm: FormGroup = new FormGroup({});
  identityForm: FormGroup = new FormGroup({});

  // User General
  incomeLevelEnums = Object.values(IncomeLevel);
  maritalStatusEnums = Object.values(MaritalStatus);
  occupationEnums = Object.values(Occupation);

  educationLevelEnums = Object.values(EducationLevel).filter(
    (value) => typeof value === 'string'
  );

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

  // Demographic Info
  citizenshipEnums = Object.values(CitizenshipStatusesEnum).filter(
    (value) => typeof value === 'string'
  );

  // Identities
  genderEnums = Object.values(GenderIdentityEnum).filter(
    (value) => typeof value === 'string'
  );
  nationalityEnums = Object.values(NationalityEnum).filter(
    (value) => typeof value === 'string'
  );
  ethnicityEnums = Object.values(EthnicityEnum).filter(
    (value) => typeof value === 'string'
  );
  sexualOrientationEnums = Object.values(SexualOrientationEnum).filter(
    (value) => typeof value === 'string'
  );

  constructor(
    private geoLocationService: GeoLocationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.demographicForm = this.userInfoForm.get
      ? (this.userInfoForm.get('demographicInfo') as FormGroup)
      : new FormGroup({});
    this.identityForm = this.demographicForm.get
      ? (this.demographicForm.get('identities') as FormGroup)
      : new FormGroup({});
  }

  getLocation() {
    this.loadingService.updateLoadingStatus(true);
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

  ngOnDestroy(): void {
    this.bindAddress();
  }

  bindAddress() {
    // add all the address forms to the user object
    this.userInfoForm.patchValue({
      addresses: this.addressForms.map((address) => address.value),
    });
  }
}
