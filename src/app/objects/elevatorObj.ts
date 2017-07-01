/**
 * Created by itay on 01/07/17.
 */
import ElevatorTask from './elevatorTask';

export default class ElevatorObj {
  protected _stoppingTime: number;
  protected _floorMoveTime: number;
  protected _currentFloor: number;
  protected _id: number;
  protected _tasks: ElevatorTask[];

  constructor(id,stoppingTime,floorMoveTime,currentFloor) {
    this._id = id;
    this._stoppingTime = stoppingTime;
    this._floorMoveTime = floorMoveTime;
    this._currentFloor = currentFloor;
    this._tasks = [];
  }

  getStoppingTime() {
    return this._stoppingTime
  }

  getId() {
    return this._id;
  }

  setTasks(tasks: ElevatorTask[]) {
    this._tasks = tasks;
  }

  getTasks() {
    return this._tasks;
  }

  getDestFloor() {
    if(this._tasks.length === 0) {
      return this._currentFloor;
    }

    return this._tasks[this._tasks.length - 1].getDestFloor();
  }

  addTask(floorNumber: number) {
    let task = this._createNewTask(floorNumber);
    this._tasks.push(task)
  }

  _createNewTask(floorNumber: number) {
    let sourceFloor = this._currentFloor;
    let destFloor = floorNumber;
    if(this._tasks.length > 0) {
      sourceFloor = this._tasks[this._tasks.length - 1].getDestFloor();
    }

    return new ElevatorTask(this._stoppingTime,this._floorMoveTime,sourceFloor,destFloor);
  }

  calculateCompletionTime() {
    let completionTime = 0;
    for(var i in this._tasks) {
      completionTime += this._tasks[i].calculateCompletionTime();
    }

    return completionTime;
  }

  calculateCompletionTimeForPotentialTask(floorNumber: number) {
    let task = this._createNewTask(floorNumber);

    return this.calculateCompletionTime() + task.calculateCompletionTime();
  }

}
