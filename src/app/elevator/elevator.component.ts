import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.scss']
})
export class ElevatorComponent implements OnInit {
  @Input() id: number;

  constructor() { }

  ngOnInit() {

  }

}
