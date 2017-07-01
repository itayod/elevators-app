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
});
