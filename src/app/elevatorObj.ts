/**
 * Created by itay on 01/07/17.
 */
export default class ElevatorObj {
  protected _stoppingTime: number;
  protected _floorMoveTime: number;
  protected _currentFloor: number;
  protected _tasks: any[]; //TBD

  constructor(stoppingTime,floorMoveTime,currentFloor) {
    this._stoppingTime = stoppingTime;
    this._floorMoveTime = floorMoveTime;
    this._currentFloor = currentFloor;
    this._tasks = [];
  }

  getStoppingTime() {
    return this._stoppingTime
  }

  addTask(floorNumber: number) {
    //TODO:
    this._tasks.push(floorNumber)
  }

  getTasks() {
    return this._tasks;
  }


}
