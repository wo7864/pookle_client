import { Component, OnInit } from '@angular/core';
import { UniService } from '../uni.Service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  isFavorite:Array<boolean>;
  posts;
  is_auth:boolean;
  constructor(private uniService: UniService) { 
    this.getList();
  }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.is_auth=true;
    }else{
      this.is_auth=false;
    }
  }

  copyMessage(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
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
  favorite(ind : number){

    if(localStorage.getItem('token')){
      let id = this.posts[ind]._id;
      if(this.isFavorite[ind]){
        this.uniService.unFavTimeline(id).subscribe(
          response => {
            this.posts[ind].fav_cnt-=1;
          },
          error => console.log('error', error)
        );
      }else{
        this.uniService.favTimeline(id).subscribe(
          response => {
            this.posts[ind].fav_cnt+=1;
          },
          error => console.log('error', error)
        );
      }
      this.isFavorite[ind] = !this.isFavorite[ind];
    }else{
      alert("관심 기능은 로그인 후에 사용가능합니다.")
    }
    
    
  }

  getList(){
    let user_id;
    this.uniService.getUserDetail().subscribe(
      response => {
          user_id = response._id;
      },   
      error => console.log('이건 에러야 !!error', error)
    );

    this.uniService.getTimelineList().subscribe(
      response => {
        this.posts = JSON.parse(response);
        let len = this.posts.length;
        this.isFavorite= [];
        for(let i=0;i<len;i++){
          this.posts[i].date = this.timeConverter(this.posts[i].date);
          this.isFavorite[i]= false;
          if(this.posts[i].fav){
            let fav_len = this.posts[i].fav.length;
            for(let j=0;j<fav_len;j++){
              if(this.posts[i].fav[j].user_id.$oid == user_id.$oid){
                this.isFavorite[i]= true;
              }
            }
          }

        }
      },
      error => console.log('error', error)
    );
  }


    /*var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;*/
  
  addFavTag(post_index, tag_index){
    if(localStorage.getItem('token')){
      let fav_tag = {'fav_tag':this.posts[post_index].tag[tag_index]};
      this.uniService.addFavTag(fav_tag).subscribe(
        response =>{},
        error => console.log('error', error)
      );
    }else{
      alert("태그를 저장하는 기능입니다. 로그인 후에 사용가능합니다.")
    }

  }

}
