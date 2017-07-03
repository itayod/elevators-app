import { Component, OnInit } from '@angular/core';
import {ElevatorsService} from '../services/elevators.service';
import ElevatorObj from '../objects/elevatorObj';

@Component({
  selector: 'elevators',
  templateUrl: './elevators.component.html',
  styleUrls: ['./elevators.component.scss'],
  providers: [ElevatorsService]
})

export class ElevatorsComponent implements OnInit {

  elevatorsJson: any[];
  elevatorsServiceEvents: any;

  constructor(protected elevatorsService: ElevatorsService) {
    this.elevatorsServiceEvents = elevatorsService.getEvents();
    this.elevatorsServiceEvents.on('elevatorsChanged',this.onElevatorsChanged.bind(this))
  }

  ngOnInit() {
    this.elevatorsJson = this.elevatorsService.getElevatorsJson();
  }

  onElevatorsChanged(elvatorsJson) {
    this.elevatorsJson = elvatorsJson;
  }

}
