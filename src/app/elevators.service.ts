import { Injectable } from '@angular/core';
import ElevatorObj from './elevatorObj';

@Injectable()
export class ElevatorsService {

  protected _elevators: ElevatorObj[];

  constructor() { }

  getElevators() {
    this._elevators;
  }
}
