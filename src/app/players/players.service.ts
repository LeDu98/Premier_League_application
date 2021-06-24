import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Player} from './player.model';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {TeamService} from '../teams/team.service';
import {Team} from '../teams/team.model';

interface PlayerData{
  id: string;
  name: string;
  surname: string;
  teamId: string;
  nationality: string;
  position: string;
  goals: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})

export class PlayersService{
  private url = `https://football-app-mobilno-rac-default-rtdb.europe-west1.firebasedatabase.app/players`;
  private _players = new BehaviorSubject<Player[]>([]);
  private team: Team;
  private playersD: Player[];


  constructor(private http: HttpClient, private teamService: TeamService) {}

  get players(){
    // eslint-disable-next-line no-underscore-dangle
    return this._players.asObservable();
  }

  addPlayer(name: string, surname: string, teamId: string, nationality: string, position: string, goals: number, imageUrl: string){
      let generatedId;
      return this.http.post<{name: string}>
      (this.url + `.json`, {
      name,
      surname,
      teamId,
      nationality,
      position,
      goals,
      imageUrl
    }).pipe(switchMap((resData)=>{
      generatedId=resData.name;
        // eslint-disable-next-line no-underscore-dangle
      return this._players;
      }),
        take(1),
        tap((players)=>{
          let team1;
          this.teamService.getTeam(teamId).subscribe((team) =>{
            team1 = team;
          });
          // eslint-disable-next-line no-underscore-dangle
          this._players.next(players.concat({
            id:generatedId,
            name,
            surname,
            team: team1,
            nationality,
            position,
            goals,
            imageUrl
          }));
        }));
  }

  getPlayers(){
  // eslint-disable-next-line max-len
    return this.http.get<{[key: string]: PlayerData}>(this.url +`.json`).
      pipe(map((playersData)=>{
        const players: Player[]=[];
        for(const key in playersData){
          if(playersData.hasOwnProperty(key)){

            this.teamService.getTeam(playersData[key].teamId).subscribe((team) =>{
              this.team = team;
              players.push({
                id:key,
                name: playersData[key].name,
                surname: playersData[key].surname,
                team: this.team,
                nationality: playersData[key].nationality,
                position: playersData[key].position,
                goals: playersData[key].goals,
                imageUrl: playersData[key].imageUrl
              });

              players.sort((a,b) =>
                (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

            });
          }
      }
      // eslint-disable-next-line no-underscore-dangle
      this._players.next(players);
        this.playersD = players;
      return players;
    }),tap(players=>{
      // eslint-disable-next-line no-underscore-dangle
      this._players.next(players);
    }));
}

  getPlayer(id: string): Player{
    return this.playersD.find(p => p.id === id);
  }

  getPlayerObj(id: string){
    let player;
    return this.http.get<{[key: string]: PlayerData}>
    (this.url + `/` + id +`.json`).
    pipe(map((playersData)=>{
      //let player;
      console.log(playersData);
      for(const key in playersData){
        if(playersData.hasOwnProperty(key)){

          this.teamService.getTeam(playersData[key].teamId).subscribe((team) =>{
            this.team = team;
            player = {
              id:key,
              name: playersData[key].name,
              surname: playersData[key].surname,
              team: this.team,
              nationality: playersData[key].nationality,
              position: playersData[key].position,
              goals: playersData[key].goals,
              imageUrl: playersData[key].imageUrl
            };
          });
        }
      }
      return player;
    }));

    return player;
  }

  deletePlayer(id: string){
    return this.http.delete(this.url + `/`+id+`.json`);
  }

  updatePlayer(id: string, numGoals: number){
    const playerPom = this.getPlayer(id);
    const name = playerPom.name;
    const surname = playerPom.surname;
    const teamId = playerPom.team.id;
    const nationality = playerPom.nationality;
    const position = playerPom.position;
    const imageUrl = playerPom.imageUrl;
    const goals = playerPom.goals + numGoals;

    return this.http.put<{name: string}>
    (this.url+'/' + playerPom.id + `.json`,
      {name,surname,teamId,nationality,position,goals,imageUrl});

  }
}
