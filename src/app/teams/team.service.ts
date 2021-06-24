import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Team} from './team.model';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {FollowService} from "../followings/follow.service";

interface TeamData{
  id: string;
  name: string;
  played: number;
  points: number;
  wins: number;
  losses: number;
  draws: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})

export class TeamService{

  url = `https://football-app-mobilno-rac-default-rtdb.europe-west1.firebasedatabase.app/teams`;
  private _teams = new BehaviorSubject<Team[]>([]);

  constructor(private http: HttpClient,  private authService: AuthService,
              private followService: FollowService) {}

  get teams(){
    // eslint-disable-next-line no-underscore-dangle
    return this._teams.asObservable();
  }

  addTeam(name: string, played: number, points: number, wins: number, losses: number, draws: number, imageUrl: string){
    let generatedId;

    return this.http.post<{name: string}>
    (this.url + `.json`,
      {name, played, points, wins, losses, draws, imageUrl})
      .pipe(switchMap((resData) => {
        generatedId = resData.name;
      // eslint-disable-next-line no-underscore-dangle
        return this._teams;

      }),
        take(1),
        tap((teams) => {

        // eslint-disable-next-line no-underscore-dangle
        this._teams.next(teams.concat({
          id: generatedId,
          wins,
          losses,
          draws,
          imageUrl,
          name,
          played,
          points
        }));

      }));
  }

  getTeams(){
    return this.http.
    get<{[key: string]: TeamData}>
      (this.url + `.json`)
      .pipe(map((teamData) => {
        const teams: Team[] = [];

        for (const key in teamData){
          if(teamData.hasOwnProperty(key)){

            teams.push({
              id: key,
              name: teamData[key].name,
              wins: teamData[key].wins,
              losses: teamData[key].losses,
              draws: teamData[key].draws,
              played: teamData[key].played,
              points: teamData[key].points,
              imageUrl: teamData[key].imageUrl
            });
            teams.sort((a,b) =>
              (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          }
        }
        // eslint-disable-next-line no-underscore-dangle
        this._teams.next(teams);
        return teams;
    }), tap(teams => {
          // eslint-disable-next-line no-underscore-dangle
          this._teams.next(teams);
        })
      );
  }

  getTeam(id: string){
    return this.http.
    get<{[key: string]: TeamData}>
    (this.url +'/' + id + `.json`)
      .pipe(map((teamData) => {
          const team: Team = {
          id,
          name: '' + teamData.name,
          wins: parseInt('' + teamData.wins, 10),
          losses: parseInt('' + teamData.losses, 10),
          draws: parseInt('' + teamData.draws, 10),
          played: parseInt('' + teamData.played, 10),
          points: parseInt('' + teamData.points, 10),
          imageUrl: '' + teamData.imageUrl
        };
          return team;
        })
      );
  }

  getFollowingTeams(){
    return this.http.
    get<{[key: string]: TeamData}>
    (this.url + `.json`)
      .pipe(map((teamData) => {
          const teams: Team[] = [];
          if(teamData === undefined){
            return null;
          }

          for (const key in teamData){
            if(teamData.hasOwnProperty(key) && (this.authService.isAdminLogged() ||
              this.followService.isFollowing(key + ''))){
              console.log('PRATI PRATI');
              teams.push({
                id: key,
                name: teamData[key].name,
                wins: teamData[key].wins,
                losses: teamData[key].losses,
                draws: teamData[key].draws,
                played: teamData[key].played,
                points: teamData[key].points,
                imageUrl: teamData[key].imageUrl
              });
            }
          }
          console.log(teams);
          return teams;
        }));
  }

  deleteTeam(id: string) {
    return this.http.delete(this.url + `/` + id + `.json`);
  }

  updateTeam(id: string, result: string){
    let teamPom;
    return this.getTeam(id).subscribe(res => {
      teamPom = res;
      console.log(teamPom);
      this.updateTeamPrivate(teamPom, result).subscribe(ret => {
        console.log('updejtovano');
      });
    });
  }

  updateTeamPrivate(team: Team, result: string){
    const name = team.name;
    const imageUrl = team.imageUrl;
    const played = team.played + 1;
    let points = team.points;
    let wins = team.wins;
    let losses = team.losses;
    let draws = team.draws;

    if(result === 'w'){
      points += 3;
      wins += 1;
    }
    if(result === 'd'){
      draws += 1;
      points += 1;
    }
    if(result === 'l'){
      losses += 1;
    }

    return this.http.put<{name: string}>
    (this.url+`/` + team.id + `.json`,
      {name, played, points, wins, losses, draws, imageUrl});
  }


}
