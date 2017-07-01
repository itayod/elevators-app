import { TestBed, inject } from '@angular/core/testing';

import { ElevatorsService } from './elevators.service';

describe('ElevatorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElevatorsService]
    });
  });

  it('should be created', inject([ElevatorsService], (service: ElevatorsService) => {
    expect(service).toBeTruthy();
  }));

  it('should be create an elevator', inject([ElevatorsService], (service: ElevatorsService) => {
    service.addElevator(1,2 , 0.5, 1);
    expect(service.getElevators().length).toEqual(1);
  }));

  it('should add a task for the right elevator', inject([ElevatorsService], (service: ElevatorsService) => {
    let elev = service.addElevator(1,2 , 0.5, 1);
    let elev2 = service.addElevator(2,2 , 0.5, 2);
    let elev3 = service.addElevator(3,2 , 0.5, 7);
    service.addNewTask(8);
    service.addNewTask(9);
    service.addNewTask(3);
    expect(elev3.getTasks().length).toEqual(2);
    expect(elev2.getTasks().length).toEqual(1);
    expect(elev.getTasks().length).toEqual(0);
  }));

  it('find the correct elevator by Id', inject([ElevatorsService], (service: ElevatorsService) => {
    let elev = service.addElevator(1,2 , 0.5, 1);
    let elev2 = service.addElevator(2,2 , 0.5, 2);
    let elev3 = service.addElevator(7,2 , 0.5, 3);
    expect(service.getElevatorById(7)).toEqual(elev3);
    expect(service.getElevatorById(2)).toEqual(elev2);
    expect(service.getElevatorById(1)).toEqual(elev);
  }));

});
