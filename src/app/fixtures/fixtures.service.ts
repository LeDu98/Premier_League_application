import {Injectable} from '@angular/core';
import {Fixtures} from './fixtures.model';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take} from 'rxjs/operators';
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {FollowService} from "../followings/follow.service";


interface FixturesData{
  id: string;
  homeTeam: string;
  homeTeamUrl: string;
  awayTeam: string;
  awayTeamUrl: string;
  date: Date;
  time: string;
  datePreview: string;
}


@Injectable({
  providedIn: 'root'
})

export class FixturesService{

  fixtures: Fixtures[];
  time: string;

  constructor(private http: HttpClient, private authService: AuthService,
              private followService: FollowService) {}

  addFixture( homeTeam: string, awayTeam: string, date: Date,  homeTeamUrl: string, awayTeamUrl: string){
    const userId = this.authService.getString();
    return this.http.post<{name: string}>
    ('https://football-app-mobilno-rac-default-rtdb.europe-west1.firebasedatabase.app/fixtures.json',
      {homeTeam, homeTeamUrl, awayTeam, awayTeamUrl, date, userId});
  }

  getFixtures(){
    return this.http.get<{[key: string]: FixturesData}>
    ('https://football-app-mobilno-rac-default-rtdb.europe-west1.firebasedatabase.app/fixtures.json').
    pipe(map((fixtureData) => {
      const fixtures: Fixtures[] = [];
      const userId = this.authService.getString();
      for (const key in fixtureData){
        if(fixtureData.hasOwnProperty(key)){

          if( this.authService.isAdminLogged() || (this.followService.isFollowing(fixtureData[key].awayTeam) ||
            this.followService.isFollowing(fixtureData[key].homeTeam ))){

            fixtures.push({
              id: key,
              awayTeam: fixtureData[key].awayTeam,
              homeTeam: fixtureData[key].homeTeam,
              date: fixtureData[key].date,
              awayTeamUrl: fixtureData[key].awayTeamUrl,
              homeTeamUrl: fixtureData[key].homeTeamUrl,
              datePreview: this.convertDate(fixtureData[key].date),
              time: this.time
            });
          }
        }
      }
      return fixtures;
    }));;
  }

  convertDate(date: Date): string{
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const dateObj = new Date(date);
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();

    this.time = dateObj.getHours() + ':' + dateObj.getMinutes();
    if(dateObj.getMinutes().toString() === '0'){
      this.time += '0';
    }

    const output = day + '. ' + month;
    return output;
  }

  getFixture(id: string){
    return this.http.
    get<{[key: string]: FixturesData}>
    (`https://football-app-mobilno-rac-default-rtdb.europe-west1.firebasedatabase.app/fixtures/` + id +`.json`)
      .pipe(map((fixtureData) => {
          let fixture: Fixtures;
          for (const key in fixtureData){
            if(fixtureData.hasOwnProperty(key)){

              fixture = {
                id,
                awayTeam: fixtureData.awayTeam + '',
                homeTeam: fixtureData.homeTeam + '',
                date: new Date(fixtureData.date + ''),
                awayTeamUrl: fixtureData.awayTeamUrl + '',
                homeTeamUrl: fixtureData.homeTeamUrl + '',
                datePreview: this.convertDate(new Date(fixtureData.date + '')),
                time: this.time,
              };
            }
          }
          return fixture;
        }));
  }

  deleteFixture(id: string): Observable<unknown> {
    return this.http.delete(`https://football-app-mobilno-rac-default-rtdb.europe-west1.firebasedatabase.app/fixtures/`+id+`.json`);
  }

}
