/**
 * Created by itay on 01/07/17.
 */
import ElevatorObj from './elevatorObj';
var elevator: ElevatorObj;
const stoppingTime = 2;
const floorMoveTime = 0.5;
const currentFloor = 1;

describe('ElevatorObj', () => {
  beforeEach(() => {
    elevator = new ElevatorObj(stoppingTime,floorMoveTime,currentFloor);
  });

  it('should create new elevator object with stopping time, floor move time, current floor', () => {
    expect(elevator).toBeTruthy();
    expect(elevator.getStoppingTime()).toEqual(stoppingTime);
  });

  it('add new task', () => {
    let floorNumber = 5;
    elevator.addTask(floorNumber);
    expect(elevator.getTasks().length).toEqual(1);
  });

});
