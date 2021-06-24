import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Follow} from './followings.model';
import {map} from 'rxjs/operators';
import {AuthService} from "../auth/auth.service";

interface FollowData{
  id: string;
  userId: string;
  teams: string[];
}

@Injectable({
  providedIn: 'root'
})

export class FollowService {

  follow: Follow;
  url = `https://football-app-mobilno-rac-default-rtdb.europe-west1.firebasedatabase.app/follow`;

  constructor(private http: HttpClient,  private authService: AuthService) { }

  addFollow( userId: string, teams: string[], followingsId: string) {
    if(followingsId == null){
      return this.http.post<{name: string}>
      (this.url+ `.json`, {userId, teams});
    }
    else{
      console.log('menjam ovo');
      console.log(teams);
      return this.http.put<{name: string}>
      (this.url+`/` + followingsId + `.json`, {userId, teams});
    }

  }

  loadFollows(){
    return this.http.
    get<{[key: string]: FollowData}>
    (this.url + `.json`)
      .pipe(map((followData) => {
          for (const key in followData){
            if(followData.hasOwnProperty(key) &&
              followData[key].userId === this.authService.getString()){
              const teams = [];
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for (let i = 0; i < (followData[key].teams).length; i++){
                teams.push((followData[key].teams)[i]);
              }
              this.follow = {
                id: key,
                userId: followData[key].userId,
                teams
              };
            }
          }
        }));
  }

  isFollowing(id: string): boolean{
    if(this.follow === undefined){
      return false;
    }
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i = 0; i < this.follow.teams.length; i++){
      if(this.follow.teams[i] === id){
        return true;
      }
    }
    return false;
  }

  getFollowId(): string{
    return this.follow.id;
  }

}
