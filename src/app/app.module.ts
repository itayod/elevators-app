import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ElevatorsComponent } from './elevators/elevators.component';
import { ElevatorsService } from './services/elevators.service';

@NgModule({
  declarations: [
    AppComponent,
    ElevatorsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ElevatorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
