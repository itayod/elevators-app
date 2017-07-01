import { Injectable } from '@angular/core';
import ElevatorObj from '../objects/elevatorObj';

@Injectable()
export class ElevatorsService {

  protected _elevators: ElevatorObj[];

  constructor() { }

  getElevators() {
    return this._elevators;
  }
}
