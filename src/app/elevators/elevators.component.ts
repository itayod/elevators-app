import { Component, OnInit, Input } from '@angular/core';
import {ElevatorsService} from '../services/elevators.service';
import _ from 'lodash';
import ElevatorObj from '../objects/elevatorObj';

@Component({
  selector: 'elevators',
  templateUrl: './elevators.component.html',
  styleUrls: ['./elevators.component.scss'],
  providers: [ElevatorsService]
})

export class ElevatorsComponent implements OnInit {

  elevatorsList: ElevatorObj[];
  elevatorsJson: any[];
  elevatorsServiceEvents: any;

  constructor(protected elevatorsService: ElevatorsService) {
    this.elevatorsServiceEvents = elevatorsService.getEvents();
    this.elevatorsServiceEvents.on('elevatorFloorUpdated',this.onElevatorFloorUpdated.bind(this))
    this.elevatorsServiceEvents.on('elevatorAdded',this.onElevatorAdded.bind(this))
    this.elevatorsServiceEvents.on('taskAdded',this.onTaskAdded.bind(this))
    this.elevatorsServiceEvents.on('taskEnded',this.onTaskEnded.bind(this))
  }

  ngOnInit() {
    this.elevatorsList = this.elevatorsService.getElevators();
    this.elevatorsJson = this._getElevatorsJson(this.elevatorsList);
  }

  _getElevatorsJson(elevators: ElevatorObj[]) {
    let elevatorsJson = []
    for(var i in elevators) {
      let elevator = this._createElevatorDataObj(elevators[i]);
      elevatorsJson.push(elevator);
    }

    return elevatorsJson;
  }

  _createElevatorDataObj(elevatorObj) {
    let elevatorDataObj = {
      id: elevatorObj.getId(),
      floorNumber: elevatorObj.getCurrentFloor(),
      tasks: []
    }

    return elevatorDataObj
  }

  _createTaskDataObj(taskObj) {
    let taskDataObj = {
      taskTotalTime: taskObj.getTaskTotalTime(),
      tasks: []
    }

    return taskDataObj
  }


  onElevatorFloorUpdated(data) {
    let elvatorDataObj = _.find(this.elevatorsJson,{id:data.id});
    elvatorDataObj.floorNumber = data.floor;
  }

  onElevatorAdded(elevator) {
    let elvatorDataObj = this._createElevatorDataObj(elevator);
    this.elevatorsJson.push(elvatorDataObj);
  }

  onTaskAdded(data) {
    let elvatorDataObj = _.find(this.elevatorsJson,{id:data.id});
    let taskData = this._createTaskDataObj(data.task);
    let interval = setInterval(() => {
      taskData.taskTotalTime -= 0.1;
      taskData.taskTotalTime = taskData.taskTotalTime.toFixed(2);
      if(taskData.taskTotalTime < 0) {
        clearInterval(interval);
      }
    },100);
    elvatorDataObj.tasks.push(taskData);
  }

  onTaskEnded() {

  }
}
