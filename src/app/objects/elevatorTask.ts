/**
 * Created by itay on 01/07/17.
 */
export default class ElevatorTask {
  protected _stoppingTime: number;
  protected _floorMoveTime: number;
  protected _currentFloor: number;
  protected _sourceFloor: number;
  protected _destFloor: number;
  protected _taskStarted: boolean;
  protected _taskEnded: boolean;
  protected _interval: any;

  constructor(stoppingTime,floorMoveTime,sourceFloor,destFloor) {
    this._stoppingTime = stoppingTime;
    this._floorMoveTime = floorMoveTime;
    this._sourceFloor = sourceFloor;
    this._destFloor = destFloor;
    this._currentFloor = sourceFloor;
  }

  calculateCompletionTime() {
    return Math.abs(this._currentFloor - this._destFloor) * this._floorMoveTime + this._stoppingTime;
  }

  startTask() {
    this._taskStarted = true;
    this._interval = setInterval(()=> {
      this._currentFloor++;
      if(this._currentFloor === this._destFloor) {
        clearInterval(this._interval);
        setTimeout(()=> {
          this._taskEnded = true;
        },this._stoppingTime)
      }
    },this._floorMoveTime);
  }


}
