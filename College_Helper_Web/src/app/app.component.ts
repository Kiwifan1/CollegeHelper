import { Component, OnInit } from '@angular/core';
import { ApiCallService } from './Services/api-call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'College_Helper';

  constructor(private apiCallService: ApiCallService) {}

  ngOnInit() {
    this.apiCallService.incrementNumber(5);
  }
}
