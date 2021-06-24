import {Component, OnInit, ViewChild} from '@angular/core';
import {Team} from '../teams/team.model';
import {TeamService} from '../teams/team.service';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {FollowService} from './follow.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-followings',
  templateUrl: './followings.page.html',
  styleUrls: ['./followings.page.scss'],
})
export class FollowingsPage implements OnInit {
  @ViewChild('f', {static: true}) form: NgForm;
  teams: Team[];
  followingTeams: Team[];
  newUser = true;
  followId: string;
  adminLogged = false;

  constructor(private teamService: TeamService,private followService: FollowService,
              private authService: AuthService,private route: ActivatedRoute,
              private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }


  ngOnInit() {
    if(this.authService.isAdminLogged()){
      this.adminLogged = true;
      console.log('Admin');
    }else{
      this.getTeams();
      console.log('Nije admin');
      this.followService.loadFollows().subscribe((data) => {
      });
      this.getFollowingTeams();
    }
  }

  getTeams(){
    this.teamService.getTeams().subscribe((teamData) =>{
      const teams: Team[] = [];

      for (const key in teamData){
        if(teamData.hasOwnProperty(key)){
          teams.push({
            id: teamData[key].id,
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

      this.teams = teams;
    });
  }

  getFollowingTeams(){
    this.teamService.getFollowingTeams().subscribe((teamData) =>{
      const teams: Team[] = [];
      if(teamData.length === 0){
        return;
      }
      for (const key in teamData){
        if(teamData.hasOwnProperty(key)){
          teams.push({
            id: teamData[key].id,
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
      this.followId = this.followService.getFollowId();
      this.newUser = false;
      this.followingTeams = teams;
    });
  }

  onAddFollowings(){
    if (!this.form.valid){
      return;
    }
    const teams = this.form.value.team;

    if(this.newUser){
      this.followService.addFollow(this.authService.getString(),
        this.convertArrayOfTeamsToArrayOfIds(teams), null)
        .subscribe((res) =>
          console.log(res)
        );
    }else{
      this.followService.addFollow(this.authService.getString(),
        this.convertArrayOfTeamsToArrayOfIds(teams), this.followId)
        .subscribe((res) =>
          console.log(res)
        );
    }
    for(let i = 0; i <2; i++){
      this.router.navigate(['/followings']);
      this.ngOnInit();
    }
  }

  compareWith(o1: Team, o2: Team | Team[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((t: Team) => t.id === o1.id);
    }

    return o1.id === o2.id;
  }

  convertArrayOfTeamsToArrayOfIds(teams: Team[]): string[] {
    const ids = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i=0;i<teams.length;i++){
      ids.push(teams[i].id);
    }
    return ids;
  }

}
