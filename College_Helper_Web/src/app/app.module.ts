import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiCallService } from './Services/api-call.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { IncrementCardComponent } from './Components/increment-card/increment-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent, IncrementCardComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [ApiCallService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
