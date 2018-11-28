import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'timeline-fav',
  templateUrl: './timeline-fav.component.html',
  styleUrls: ['./timeline-fav.component.css']
})
export class TimelineFavComponent implements OnInit {
  @Input() data;
  @Output() refresh:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

}
