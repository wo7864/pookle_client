import { Component, OnInit, HostListener } from '@angular/core';
import { UniService } from '../uni.Service'
import { SlideInOutAnimation } from '../animation';

@Component({
  selector: 'all-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [SlideInOutAnimation]  
})
export class HeaderComponent implements OnInit {
  is_auth:boolean=false;
  animationState = 'in';

  constructor(private uniService: UniService,) {

   }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.is_auth=true;
    }else{
      this.is_auth=false;
    }

  }
  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    if(window.pageYOffset>=110){
      this.animationState='out';
    }else{
      this.animationState='in';
    }
  } 

}
