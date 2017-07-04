import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import AppConstants from './../constants';

@Component({
  selector: 'elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.scss']
})
export class ElevatorComponent implements OnInit {

  @Input() floor: number;
  @Input() id: number;
  @Input() elementId: string;
  element: any;

  constructor() { }

  ngOnInit() {
    this.elementId = 'elevator-' + this.id;
  }

  ngAfterViewInit() {
    this.element = document.getElementById(this.elementId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['floor']) {
      if(this.element) {
        this.element.style.top = this.floor * AppConstants.FLOOR_SIZE_IN_PX + 'px';
      }
    }
  }

}
