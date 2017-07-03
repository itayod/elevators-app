/**
 * Created by itay on 01/07/17.
 */
import {EventsService} from './../services/events.service';
import ElevatorTask from './elevatorTask';

export default class ElevatorObj {
  protected _stoppingTime: number;
  protected _floorMoveTime: number;
  protected _currentFloor: number;
  protected _id: number;
  protected _tasks: ElevatorTask[];
  protected events: EventsService = new EventsService();


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

  getCurrentFloor() {
    return this._currentFloor;
  }

  getEvents() {
    return this.events;
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

  addTask(floorNumber: number,id:number) {
    let task = this._createNewTask(floorNumber,id);
    let taskEventService = task.getEvents();
    taskEventService.on('currentFloorUpdated',this.onCurrentFloorUpdated.bind(this))
    taskEventService.on('taskEnded',this.onTaskEnded.bind(this));
    if(this._tasks.length === 0) {
      task.startTask();
    }

    this.events.broadcast('taskAdded',{id:this._id,task:task});
    this._tasks.push(task)

    return task;
  }

  endTask(task: ElevatorTask) {
    let index = this._tasks.indexOf(task);
    this.events.broadcast('taskEnded',{elevatorId:this._id,taskId:task.getId()});
    this._tasks.splice(index,1);
  }

  _createNewTask(floorNumber: number,id:number) {
    let sourceFloor = this._currentFloor;
    let destFloor = floorNumber;
    if(this._tasks.length > 0) {
      sourceFloor = this._tasks[this._tasks.length - 1].getDestFloor();
    }
    let startingTime = this.calculateCompletionTime();

    return new ElevatorTask(id,this._stoppingTime,this._floorMoveTime,sourceFloor,destFloor,startingTime);
  }

  calculateCompletionTime() {
    let completionTime = 0;
    for(var i in this._tasks) {
      completionTime += this._tasks[i].calculateCompletionTime();
    }

    return completionTime;
  }

  calculateCompletionTimeForPotentialTask(floorNumber: number) {
    let task = this._createNewTask(floorNumber,1);

    return this.calculateCompletionTime() + task.calculateCompletionTime();
  }

  onCurrentFloorUpdated(floor) {
    this._currentFloor = floor;
    this.events.broadcast('currentFloorUpdated',{id:this._id,floor:this._currentFloor});
  }

  onTaskEnded(task) {
    this.endTask(task);
    let firstTask = this._tasks.shift();
    if(firstTask) {
      firstTask.startTask();
    };
  }

}
