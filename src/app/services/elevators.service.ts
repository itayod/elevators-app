import { Injectable } from '@angular/core';
import ElevatorObj from '../objects/elevatorObj';

@Injectable()
export class ElevatorsService {

  protected _elevators: ElevatorObj[];

  constructor() { }

  getElevators() {
    return this._elevators;
  }

  addElevator(stoppingTime:number,floorMoveTime:number,currentFloor:number) {
    let elevator = new ElevatorObj(stoppingTime,floorMoveTime,currentFloor);
    this._elevators.push(elevator);
  }

  addNewTask() {

  }

  _findElevatorForTask() {

  }


}
