import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';
import {Fixtures} from '../fixtures/fixtures.model';
import {Team} from '../teams/team.model';
import {Player} from '../players/player.model';
import {TeamService} from '../teams/team.service';
import {PlayersService} from '../players/players.service';
import {Results} from './results.model';
import {AuthService} from '../auth/auth.service';
import {FollowService} from '../followings/follow.service';

interface ResultData{
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  goalsHome: number;
  goalsAway: number;
  homeScorers: Player[];
  awayScorers: Player[];
  date: Date;
  datePreview: string;
}

@Injectable({
  providedIn: 'root'
})

export class ResultsService{

  resultsD: Results[];
  constructor(private http: HttpClient, private teamService: TeamService,
              private playersService: PlayersService, private authService: AuthService,
              private followService: FollowService) {}

  convertDate(date: Date): string{
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const dateObj = new Date(date);
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();

    const output = day + '. ' + month;
    return output;
  }

  addResult( homeTeam: string, awayTeam: string, goalsHome: number,  goalsAway: number,
             homeScorers: string[], awayScorers: string[], date: Date) {
    let generatedId;

    if(this.generateResult(goalsHome, goalsAway) === 'h'){
      this.teamService.updateTeam(homeTeam,'w');
      this.teamService.updateTeam(awayTeam,'l');
    }

    if(this.generateResult(goalsHome, goalsAway) === 'a'){
      this.teamService.updateTeam(homeTeam,'l');
      this.teamService.updateTeam(awayTeam,'w');
    }

    if(this.generateResult(goalsHome, goalsAway) === 'd'){
      this.teamService.updateTeam(homeTeam,'d');
      this.teamService.updateTeam(awayTeam,'d');
    }
    let i;
    let goals = 0;
    if(homeScorers !== undefined){
      for(i = 0; i<homeScorers.length; i++){
        goals = 0;
        goals = this.numberOfGoals(homeScorers, homeScorers[i]);
        this.playersService.updatePlayer(homeScorers[i], goals).subscribe(ret => {
          console.log();
        });
      }
    }

    if(awayScorers !== undefined){
      for(i = 0; i<awayScorers.length; i++){
        goals = 0;
        goals = this.numberOfGoals(awayScorers, awayScorers[i]);
        this.playersService.updatePlayer(awayScorers[i], goals).subscribe(ret => {
          console.log();
        });
      }
    }

    return this.http.post<{ name: string }>
    (`https://football-app-mobilno-rac-default-rtdb.europe-west1.firebasedatabase.app/results.json`,
      {homeTeam, awayTeam, goalsHome, goalsAway, homeScorers, awayScorers, date})
      .pipe(map((resData) => {
        generatedId = resData.name;
        return generatedId;
      }));
  }

  getResults(){
    return this.http.get<{[key: string]: ResultData}>
    (`https://football-app-mobilno-rac-default-rtdb.europe-west1.firebasedatabase.app/results.json`).
    pipe(map((resultData) => {

      const results: Results[] = [];

      for (const key in resultData){
        if(resultData.hasOwnProperty(key)){

          if(this.authService.isAdminLogged() ||
            this.followService.isFollowing(resultData[key].awayTeam + '') ||
            this.followService.isFollowing(resultData[key].homeTeam + '')){
              this.teamService.getTeam(resultData[key].homeTeam + '').subscribe((teamHome)=> {

              this.teamService.getTeam(resultData[key].awayTeam + '').subscribe((teamAway)=> {

                const homeScorers = [];
                let i;
                if(!(resultData[key].goalsHome === 0)){
                  for(i = 0; i < resultData[key].homeScorers.length; i++){
                    const pom = this.playersService.getPlayer(resultData[key].homeScorers[i] + '');
                    console.log(resultData[key].homeScorers[0]);
                    homeScorers.push(pom);
                  }
                }

                const awayScorers = [];
                if(!(resultData[key].goalsAway === 0)){
                  for(i = 0; i < resultData[key].awayScorers.length; i++){
                    const pom = this.playersService.getPlayer(resultData[key].awayScorers[i] + '');
                    awayScorers.push(pom);
                  }
                }

                results.push({
                  id: key,
                  clubHome: teamHome,
                  clubAway: teamAway,
                  goalsHome: resultData[key].goalsHome,
                  goalsAway: resultData[key].goalsAway,
                  homeScorers,
                  awayScorers,
                  date: resultData[key].date,
                  datePreview: this.convertDate(resultData[key].date)
                });

                // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
                results.sort(function(a, b) {
                  return (new Date(a.date).getTime() - new Date(b.date).getTime());
                });
              });
            });
          }


        }
      }
      console.log(results);


      this.resultsD = results;
      return results;
    }));
  }

  getResult(id: string): Results{
    console.log(this.resultsD);
    return this.resultsD.find(p => p.id === id);
  }

  //returns string h, a or d
  //h - home team won
  //a - away team won,
  //d - draw
  generateResult(goalsHome: number,  goalsAway: number): string{
      if(goalsHome > goalsAway){
        return 'h';
      }
      if(goalsHome < goalsAway){
        return 'a';
      }
      else{
        return 'd';
      }
  }

  numberOfGoals(scorers: string[], scorer: string){
    var goals = 0;
    var i;
    for(i = 0; i<scorers.length; i++) {
      if(scorer === scorers[i]){
        goals += 1;
      }
    }
    console.log('igrac ' + scorer + ' je dao ' + goals + ' golova');
    return goals;
  }

}

