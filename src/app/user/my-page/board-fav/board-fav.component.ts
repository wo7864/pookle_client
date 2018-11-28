import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'board-fav',
  templateUrl: './board-fav.component.html',
  styleUrls: ['./board-fav.component.css']
})
export class BoardFavComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
