import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Fixtures} from '../fixtures.model';
import {FixturesService} from '../fixtures.service';
import {ActivatedRoute} from '@angular/router';
import {Player} from '../../players/player.model';
import {PlayersService} from '../../players/players.service';
import {NgForm} from '@angular/forms';
import {Team} from '../../teams/team.model';
import {ResultsService} from '../../results/results.service';
import {AuthService} from "../../auth/auth.service";


@Component({
  selector: 'app-fixtures-details',
  templateUrl: './fixtures-details.page.html',
  styleUrls: ['./fixtures-details.page.scss'],
})
export class FixturesDetailsPage implements OnInit {
  @ViewChild('f2', {static: true}) form: NgForm;
  //@ViewChild('f3', {static: true}) form3: NgForm;

  fixture1: Fixtures = {
    time: '',
    id: '',
    homeTeam: '',
    homeTeamUrl: '',
    datePreview: '',
    date: new Date(),
    awayTeamUrl: '',
    awayTeam: '',
  };

  resultsForm: boolean;
  scorersForm: boolean;
  homeTeamPlayers: Player[] = [];
  awayTeamPlayers: Player[] = [];
  homeTeamGoals: string;
  awayTeamGoals: string;
  arrayHome: string[];
  arrayAway: string[];
  homeScorers: string[];
  awayScorers: string[];
  adminLogged = false;

  constructor(private fixtureService: FixturesService, private route: ActivatedRoute,
              private playersService: PlayersService, private resultsService: ResultsService,
              private authService: AuthService) {
    this.resultsForm = false;
    this.scorersForm = false;
    this.arrayHome = [];
    this.arrayAway = [];
    this.homeScorers = [];
    this.awayScorers = [];
  }

  ngOnInit() {
    this.adminLogged = this.authService.isAdminLogged();
    const id = this.route.snapshot.paramMap.get('fixtureId');
    this.fixtureService.getFixture(id).subscribe(fixture => {
        this.fixture1 = fixture;
        this.playersService.getPlayers().subscribe((playersData) =>{
          this.homeTeamPlayers = playersData;
          this.awayTeamPlayers = playersData;
        });
    });
  }

  ionViewWillEnter(){}

  displayResultForm(){
    this.resultsForm = true;
    this.homeTeamPlayers = this.homeTeamPlayers.filter(p => p.team.id === this.fixture1.homeTeam);
    this.awayTeamPlayers = this.awayTeamPlayers.filter(p => p.team.id === this.fixture1.awayTeam);
  }

  homeTeamGoalsChanged(value: string){
    if(this.homeTeamGoals !== undefined){
      window.history.back();
    }
    this.homeTeamGoals = value;
    for(let i = 0; i <  parseInt(value, 10); i++) {
      this.arrayHome.push('homeName'+ i);
    }
  }

  awayTeamGoalsChanged(value: string){
    if(this.awayTeamGoals !== undefined){
      window.history.back();
    }
    this.awayTeamGoals = value;
    for(let i = 0; i <  parseInt(value, 10); i++) {
      this.arrayAway.push('awayName'+ i);
    }
  }

  onAddResult(){

    let i;
    for (i = 0; i< this.arrayHome.length; i++){
      const x = (document.getElementById('homeName'+ i) as HTMLInputElement).value as unknown as Team;
      this.homeScorers.push(x.id);
    }

    for (i = 0; i< this.arrayAway.length; i++){
      const y =(document.getElementById('awayName'+ i) as HTMLInputElement).value as unknown as Team;
      this.awayScorers.push(y.id);
    }

    this.resultsService.addResult(this.fixture1.homeTeam,this.fixture1.awayTeam,
      parseInt(this.homeTeamGoals, 10), parseInt( this.awayTeamGoals, 10), this.homeScorers,
      this.awayScorers, this.fixture1.date).subscribe((res) =>{
        this.fixtureService.deleteFixture(this.fixture1.id).subscribe((ret) => {
          console.log(ret);
          // location.href = '../fixtures';
          window.history.back();
        });
     });
  }

  onAddScorers(){
    this.scorersForm = true;
  }

  getPlayers(teamId: string){}

  compareWith(o1: Player, o2: Player | Player[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((p: Player) => p.id === o1.id);
    }

    return o1.id === o2.id;
  }
}
