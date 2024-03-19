import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  key = environment.GEO_API_KEY;
  constructor(private $http: HttpClient) {}

  getAddressFromLatLong(lat: number, long: number) {
    const url = environment.GEO_API_URL + '/reverse';
    let params = `?lat=${lat}&lon=${long}&api_key=${this.key}`;
    return this.$http.get(url + params);
  }
}
