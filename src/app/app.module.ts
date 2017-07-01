import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ElevatorsComponent } from './elevators/elevators.component';
import { ElevatorsService } from './services/elevators.service';
import { ElevatorComponent } from './elevator/elevator.component';
import { ElevatorTaskComponent } from './elevator-task/elevator-task.component';

@NgModule({
  declarations: [
    AppComponent,
    ElevatorsComponent,
    ElevatorComponent,
    ElevatorTaskComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [ElevatorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
