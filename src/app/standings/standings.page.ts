import { Component, OnInit } from '@angular/core';
import {TeamService} from '../teams/team.service';
import {Team} from '../teams/team.model';
import {FollowService} from '../followings/follow.service';

interface TeamsPreview{
  position: number;
  team: Team;
}


@Component({
  selector: 'app-standings',
  templateUrl: './standings.page.html',
  styleUrls: ['./standings.page.scss'],
})
export class StandingsPage implements OnInit {

  teams: Team[];
  teamsPreview = [];


  constructor(private teamService: TeamService, private followService: FollowService) {
    //this.teams = this.teamService.teams;
  }

  ngOnInit() {
    this.followService.loadFollows().subscribe((data) => {
    });
    this.teamService.teams.subscribe((teams) => {
      this.teams = teams;
    });
  }

  ionViewWillEnter(){
    this.teamsPreview=[];
    this.teamService.getTeams().subscribe((teams) =>{
      this.teams = teams.sort((a, b) => b.points-a.points);
      let i = 1;
      for(const key in teams){
        this.teamsPreview.push({
          position: i++,
          team: teams[key]
        });
      }
    });
  }

}
