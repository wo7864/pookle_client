import { Component, OnInit } from '@angular/core';
import { UniService } from '../../uni.Service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {
  profile_data;
  timeline_data;
  board_data;
  tag_data;
  constructor(private uniService: UniService) {
    this.getUserDetail();
   }

  ngOnInit() {
  }
  btn_arr:boolean[]=[];
  open(index){
    this.btn_arr[index]=true;
  }
  close(index){
    this.btn_arr[index]=false;
  }
  nickname(){
    this.getUserDetail();
  }
  refresh(){
    this.getUserDetail();
  }

  getUserDetail(){
    this.uniService.getUserDetail().subscribe(
      response => {
        this.profile_data={
          id:response.id,
          nickname:response.nickname,
        };
        this.timeline_data = response.fav_timeline;
        let len = this.timeline_data.length;
        for(let i=0;i<len;i++){
          this.timeline_data[i].date = this.timeConverter(this.timeline_data[i].date);
        }
        this.board_data = response.like_board;
        this.tag_data = response.fav_tag;
      },   
      error => console.log('이건 에러야 !!error', error)
    );
  }


  timeConverter(UNIX_timestamp){
    UNIX_timestamp = UNIX_timestamp.replace(/[^0-9]/g,"");
    let year:number = UNIX_timestamp.substring(0,4);
    let month:number = UNIX_timestamp.substring(4,6)-1;
    let day:number = UNIX_timestamp.substring(6,8);
    let hour:number = UNIX_timestamp.substring(8,10);
    let min:number = UNIX_timestamp.substring(10,12);
    let sec:number = UNIX_timestamp.substring(12,14);
    let date = new Date(year, month, day, hour, min,sec);
    console.log(UNIX_timestamp);

    console.log(date);
    let now = Math.round(new Date().getTime());

    let elapsed_time = (now-date.getTime())/1000;

    if(elapsed_time>=2592000){
      elapsed_time /= 2592000;
      return Math.floor(elapsed_time)+"개월 전";
    }else if(elapsed_time>=86400){
      elapsed_time /= 86400;
      return Math.floor(elapsed_time)+"일 전";
    }else if(elapsed_time>=3600){
      elapsed_time /= 3600;
      return Math.floor(elapsed_time)+"시간 전";
    }else if(elapsed_time>=300){
      elapsed_time /=60;
      return Math.floor(elapsed_time)+"분 전";
    }else{
      return "방금 전";
    }
  }
}
