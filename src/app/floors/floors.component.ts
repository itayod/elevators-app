import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss']
})
export class FloorsComponent implements OnInit {
  @Input() maxFloor: number = 10;
  @Input() minFloor: number = 0;
  @Output() floorSelected: EventEmitter<number> = new EventEmitter();
  public floors: number[];

  constructor() {
  }

  ngOnInit() {
    this.floors = this._createFloors(this.minFloor,this.maxFloor);
    console.log(this.floors)
  }

  selectFloor(floor) {
    this.floorSelected.emit(floor)
  }

  _createFloors(min,max) {
    let floors = [];
    for(var i = min; i < (max+1); i++) {
      floors.push(i);
    }

    return floors;
  }

}
