import { Injectable } from '@angular/core';
import {EventsService} from './../services/events.service';
import ElevatorObj from '../objects/elevatorObj';

@Injectable()
export class ElevatorsService {

  protected events: EventsService;
  protected _elevators: ElevatorObj[];
  protected _elevatorIdCounter: number = 1;
  protected _taskMaxId: number = 1;

  constructor(events: EventsService) {
    this.events = events;
    this._elevators = [];
  }

  getEvents() {
    return this.events;
  }

  getElevators() {
    return this._elevators;
  }

  getElevatorById(id: number) {
    for(let i in this._elevators) {
      if(this._elevators[i].getId() === id) {
        return this._elevators[i];
      }
    }
    console.warn("couldn't find an elevator with id: " + id);

    return false;
  }

  addElevator(stoppingTime:number,floorMoveTime:number,currentFloor:number) {
    let elevator = new ElevatorObj(this._elevatorIdCounter++,stoppingTime,floorMoveTime,currentFloor);
    let elevatorEvents = elevator.getEvents();
    elevatorEvents.on('currentFloorUpdated',(data)=> {
      this.events.broadcast('elevatorFloorUpdated',data);
    })
    elevatorEvents.on('taskAdded',(data)=> {
      this.events.broadcast('taskAdded',data);
    })
    elevatorEvents.on('taskEnded',(data)=> {
      this.events.broadcast('taskEnded',data);
    })
    this.events.broadcast('elevatorAdded',elevator);

    this._elevators.push(elevator);

    return elevator;
  }

  addNewTask(floorNumber: number) {
    let min = Number.MAX_VALUE;
    let selectedElevator;
    for(let i in this._elevators) {
      let completionTimeForPotentialTask = this._elevators[i].calculateCompletionTimeForPotentialTask(floorNumber);
      if(completionTimeForPotentialTask < min) {
        min = completionTimeForPotentialTask;
        selectedElevator = this._elevators[i];
      }
    }

    selectedElevator.addTask(floorNumber,this._taskMaxId++);
  }


}
