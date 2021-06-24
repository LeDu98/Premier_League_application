import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {TeamService} from '../../team.service';
import {Team} from '../../team.model';
import {Player} from "../../../players/player.model";
import {Subscription} from "rxjs";
import {MenuController, ModalController} from "@ionic/angular";
import {PlayersService} from "../../../players/players.service";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-teams-details',
  templateUrl: './teams-details.page.html',
  styleUrls: ['./teams-details.page.scss'],
})
export class TeamsDetailsPage implements OnInit {
  adminLogged = false;
  players: Player[];
  private playerSub: Subscription;

  team: Team = {
    id: '2',
    losses: 2,
    draws: 1,
    wins: 4,
    played: 4,
    name: '231412',
    points: 23,
    imageUrl: ''
  };

  constructor(private teamService: TeamService, private route: ActivatedRoute,
              private menuCtrl: MenuController,private playerService: PlayersService,
              private modalCtrl: ModalController, private authService: AuthService) { }

  ngOnInit() {

    this.adminLogged = this.authService.isAdminLogged();
    const id = this.route.snapshot.paramMap.get('teamId');
    this.teamService.getTeam(id).subscribe(team => {
            this.team = team;
    });
    this.playerSub = this.playerService.players.subscribe((players)=>{
      this.players=players;
    });
  }

  getPlayers(){
    this.playerService.getPlayers().subscribe((players)=>{
      //this.players=players;
    });
  }

  ionViewWillEnter(){
    this.getPlayers();
    this.players.sort((a, b) => a.surname.localeCompare(b.surname));
  }

  ngOnDestroy(){
    if(this.playerSub){
      this.playerSub.unsubscribe();
    }
  }

  onDelete(){
    const id = this.route.snapshot.paramMap.get('teamId');
    this.teamService.deleteTeam(id).subscribe((ret)=>{
      console.log(ret);
      window.history.back();
    });
  }
}
