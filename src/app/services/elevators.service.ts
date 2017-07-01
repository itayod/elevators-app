import { Injectable } from '@angular/core';
import ElevatorObj from '../objects/elevatorObj';

@Injectable()
export class ElevatorsService {

  protected _elevators: ElevatorObj[];

  constructor() {
    this._elevators = [];
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

  addElevator(id:number,stoppingTime:number,floorMoveTime:number,currentFloor:number) {
    let elevator = new ElevatorObj(id,stoppingTime,floorMoveTime,currentFloor);
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

    selectedElevator.addTask(floorNumber);
  }


}
