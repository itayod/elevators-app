import _ from 'lodash';
import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {ElevatorsService} from '../services/elevators.service';
import AppConstants from './../constants';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss'],
  providers: [ElevatorsService]
})
export class FloorsComponent implements OnInit {
  @Input() maxFloor: number = 10;
  @Input() minFloor: number = 0;
  @Output() floorSelected: EventEmitter<number> = new EventEmitter();
  public floors: {}[];
  elevatorsServiceEvents: any;


  constructor(protected elevatorsService: ElevatorsService) {
    this.elevatorsServiceEvents = elevatorsService.getEvents();
    this.elevatorsServiceEvents.on('taskAdded',this.onTaskAdded.bind(this));
    this.elevatorsServiceEvents.on('taskEnded',this.onTaskEnded.bind(this));
  }

  ngOnInit() {
    this.floors = this._createFloors(this.minFloor,this.maxFloor);
    console.log(this.floors)
  }

  getFloorHeight() {
    return AppConstants.FLOOR_SIZE_IN_PX + 'px'
  }

  onTaskAdded(data) {
    let floor = _.find(this.floors,{number: data.task.getDestFloor()});
    floor.active = true;
  }

  onTaskEnded(data) {
    let floor = _.find(this.floors,{number: data.task.getDestFloor()});
    floor.active = false;
  }


  selectFloor(floor) {
    this.floorSelected.emit(floor.number)
  }

  _createFloors(min,max) {
    let floors = [];
    for(var i = min; i < (max + 1); i++) {
      let floorObj = {
        number: i,
        active: false
      }
      floors.push(floorObj);
    }

    return floors;
  }

}
