import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GeoLocationService } from 'src/app/Services/geolocation.service';
import { LoadingService } from 'src/app/Services/loading.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  @Input() addressForm!: FormGroup;

  constructor(  
    private loadingService: LoadingService,
    private geoLocationService: GeoLocationService
  ) {}
}
