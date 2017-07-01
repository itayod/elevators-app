import { Component, OnInit, Input } from '@angular/core';
import {ElevatorsService} from '../services/elevators.service';
import ElevatorObj from '../objects/elevatorObj';

@Component({
  selector: 'elevators',
  templateUrl: './elevators.component.html',
  styleUrls: ['./elevators.component.scss'],
  providers: [ElevatorsService]
})

export class ElevatorsComponent implements OnInit {
  @Input() elevatorIds: any;

  // @Input() set elevatorsList(val) {
  //   console.log(val);
  // }

  constructor(protected elevatorsService: ElevatorsService) {
  }

  ngOnInit() {
    // this.elevatorsList = this.elevatorsService.getElevators();
  }

}
