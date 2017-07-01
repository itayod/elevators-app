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
    service.addElevator(2 , 0.5, 1);
    expect(service.getElevators().length).toEqual(1);
  }));

});
