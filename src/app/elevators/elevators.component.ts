import { Component, OnInit } from '@angular/core';
import {ElevatorsService} from '../elevators.service';
@Component({
  selector: 'app-elevators',
  templateUrl: './elevators.component.html',
  styleUrls: ['./elevators.component.scss'],
  providers: [ElevatorsService]
})

export class ElevatorsComponent implements OnInit {
  public elevators: any[];

  constructor(protected elevatorsService: ElevatorsService) {
    this.elevators = this.elevatorsService.getElevators();
  }

  ngOnInit() {
  }

}
