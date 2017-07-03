import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'elevator-task',
  templateUrl: './elevator-task.component.html',
  styleUrls: ['./elevator-task.component.scss']
})
export class ElevatorTaskComponent implements OnInit {
  @Input() taskTotalTime: number;

  constructor() { }

  ngOnInit() {
    let interval = setInterval(() => {
      this.taskTotalTime -= 0.1;
      this.taskTotalTime = Number(this.taskTotalTime.toFixed(2));
      if(this.taskTotalTime < 0) {
        clearInterval(interval);
      }
    },100);
  }

}
